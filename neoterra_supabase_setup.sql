-- ==============================================================================
-- NEOTERRA LAUNCHER — SUPABASE DATABASE & RPC SETUP
-- Ushbu SQL skriptni Supabase Dashboard > SQL Editor oynasiga qo'yib RUN tugmasini bosing:
-- https://supabase.com/dashboard/project/hhpnhwfzovbttorprudl/sql/new
-- ==============================================================================

-- 0. ADVISOR XAVFSIZLIK XATOSINI TUZATISH (Security Definer View)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_views 
        WHERE schemaname = 'public' AND viewname = 'chat_messages_public'
    ) THEN
        ALTER VIEW public.chat_messages_public SET (security_invoker = true);
    END IF;
END $$;

-- 1. PROFILES jadvaliga kerakli ustunlarni qo'shish (agar yo'q bo'lsa)
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS hbc INT DEFAULT 0;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS premium BOOLEAN DEFAULT false;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS pro_until TIMESTAMPTZ;

-- 1.1. PUBLIC_PROFILES view (Minecraft modlari o'yinchi kosmetikasini qidirishi uchun)
CREATE OR REPLACE VIEW public.public_profiles WITH (security_invoker = true) AS
SELECT id, username, minecraft_nick
FROM public.profiles;

GRANT SELECT ON public.public_profiles TO anon, authenticated;

-- 2. PLAYER_COSMETICS jadvali (o'yinchi taqqan plash, qanot, pet, shlyapa)
CREATE TABLE IF NOT EXISTS public.player_cosmetics (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    slots JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.player_cosmetics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read player cosmetics" ON public.player_cosmetics;
CREATE POLICY "Anyone can read player cosmetics" ON public.player_cosmetics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own cosmetics" ON public.player_cosmetics;
CREATE POLICY "Users can update own cosmetics" ON public.player_cosmetics FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- 3. COSMETIC_PURCHASES jadvali (o'yinchining sotib olgan aksessuarlari)
CREATE TABLE IF NOT EXISTS public.cosmetic_purchases (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    item_key TEXT NOT NULL,
    price_hbc INT NOT NULL DEFAULT 50,
    is_trial BOOLEAN DEFAULT false,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, item_key)
);

ALTER TABLE public.cosmetic_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own cosmetic purchases" ON public.cosmetic_purchases;
CREATE POLICY "Users can view own cosmetic purchases" ON public.cosmetic_purchases FOR SELECT 
USING (auth.uid() = user_id);

-- 4. LAUNCHER_PRO jadvali (PRO obuna holati)
CREATE TABLE IF NOT EXISTS public.launcher_pro (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    is_pro BOOLEAN DEFAULT true,
    pro_until TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.launcher_pro ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own pro status" ON public.launcher_pro;
CREATE POLICY "Users can view own pro status" ON public.launcher_pro FOR SELECT 
USING (auth.uid() = user_id);

-- 5. SHOP_ITEMS va PURCHASES (do'kon foni va buyumlari)
CREATE TABLE IF NOT EXISTS public.shop_items (
    id BIGSERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price_hbc INT NOT NULL DEFAULT 50,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view shop items" ON public.shop_items;
CREATE POLICY "Anyone can view shop items" ON public.shop_items FOR SELECT USING (is_active = true);

CREATE TABLE IF NOT EXISTS public.shop_item_purchases (
    id BIGSERIAL PRIMARY KEY,
    profile_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    item_id BIGINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, item_id)
);

ALTER TABLE public.shop_item_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own shop purchases" ON public.shop_item_purchases;
CREATE POLICY "Users can view own shop purchases" ON public.shop_item_purchases FOR SELECT 
USING (auth.uid() = profile_id);

-- 6. BACKGROUND_PURCHASES jadvali
CREATE TABLE IF NOT EXISTS public.background_purchases (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    background_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, background_id)
);

ALTER TABLE public.background_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own background purchases" ON public.background_purchases;
CREATE POLICY "Users can view own background purchases" ON public.background_purchases FOR SELECT 
USING (auth.uid() = user_id);

-- 7. MODEL_PURCHASES jadvali
CREATE TABLE IF NOT EXISTS public.model_purchases (
    id BIGSERIAL PRIMARY KEY,
    profile_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    model_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, model_id)
);

ALTER TABLE public.model_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own model purchases" ON public.model_purchases;
CREATE POLICY "Users can view own model purchases" ON public.model_purchases FOR SELECT 
USING (auth.uid() = profile_id);

-- 8. TRANSACTIONS jadvali (barcha xaridlar va balans tarixi)
CREATE TABLE IF NOT EXISTS public.transactions (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'purchase',
    amount INT NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NTC',
    item_key TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own transactions" ON public.transactions;
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own transactions" ON public.transactions;
CREATE POLICY "Users can insert own transactions" ON public.transactions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- ==============================================================================
-- RPC FUNKSIYALARI (STORE & PRO XARIDLAR SERVER-SIDE)
-- ==============================================================================

-- 1. purchase_launcher_pro (PRO xaridi: 120 NTC, 30 kun)
CREATE OR REPLACE FUNCTION public.purchase_launcher_pro()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_cur_hbc INT;
    v_price INT := 120;
    v_new_bal INT;
    v_pro_until TIMESTAMPTZ;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Avtorizatsiyadan o''ting';
    END IF;

    SELECT COALESCE(hbc, 0) INTO v_cur_hbc FROM public.profiles WHERE id = v_user_id FOR UPDATE;
    IF v_cur_hbc IS NULL THEN
        RAISE EXCEPTION 'Profil topilmadi';
    END IF;

    IF v_cur_hbc < v_price THEN
        RAISE EXCEPTION 'HBC yetarli emas';
    END IF;

    v_new_bal := v_cur_hbc - v_price;
    v_pro_until := NOW() + INTERVAL '30 days';

    UPDATE public.profiles 
    SET hbc = v_new_bal, premium = true, pro_until = v_pro_until, updated_at = NOW()
    WHERE id = v_user_id;

    INSERT INTO public.launcher_pro (user_id, is_pro, pro_until, updated_at)
    VALUES (v_user_id, true, v_pro_until, NOW())
    ON CONFLICT (user_id) 
    DO UPDATE SET is_pro = true, pro_until = EXCLUDED.pro_until, updated_at = NOW();

    INSERT INTO public.transactions (user_id, title, category, amount, item_key)
    VALUES (v_user_id, 'NeoTerra PRO (30 kun)', 'subscription', -v_price, 'pro:launcher-30d');

    RETURN json_build_object(
        'ok', true,
        'new_balance', v_new_bal,
        'pro_until', v_pro_until,
        'price_hbc', v_price
    );
END;
$$;

-- 2. my_launcher_pro (PRO holatini tekshirish)
CREATE OR REPLACE FUNCTION public.my_launcher_pro()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_pro RECORD;
    v_is_pro BOOLEAN := false;
    v_until TIMESTAMPTZ := NULL;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN json_build_object('is_pro', false, 'pro_until', null);
    END IF;

    SELECT * INTO v_pro FROM public.launcher_pro WHERE user_id = v_user_id;
    IF FOUND AND v_pro.pro_until > NOW() THEN
        v_is_pro := true;
        v_until := v_pro.pro_until;
    ELSE
        SELECT premium, pro_until INTO v_pro FROM public.profiles WHERE id = v_user_id;
        IF FOUND AND v_pro.premium = true AND (v_pro.pro_until IS NULL OR v_pro.pro_until > NOW()) THEN
            v_is_pro := true;
            v_until := COALESCE(v_pro.pro_until, NOW() + INTERVAL '30 days');
        END IF;
    END IF;

    RETURN json_build_object(
        'is_pro', v_is_pro,
        'pro_until', v_until
    );
END;
$$;

-- 3. purchase_cosmetic (Aksessuar xaridi)
CREATE OR REPLACE FUNCTION public.purchase_cosmetic(p_item_key TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_cur_hbc INT;
    v_price INT := 20;
    v_new_bal INT;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Avtorizatsiyadan o''ting';
    END IF;

    SELECT COALESCE(hbc, 0) INTO v_cur_hbc FROM public.profiles WHERE id = v_user_id FOR UPDATE;
    IF v_cur_hbc < v_price THEN
        RAISE EXCEPTION 'HBC yetarli emas';
    END IF;

    v_new_bal := v_cur_hbc - v_price;

    UPDATE public.profiles SET hbc = v_new_bal, updated_at = NOW() WHERE id = v_user_id;

    INSERT INTO public.cosmetic_purchases (user_id, item_key, price_hbc)
    VALUES (v_user_id, p_item_key, v_price)
    ON CONFLICT (user_id, item_key) DO NOTHING;

    INSERT INTO public.transactions (user_id, title, category, amount, item_key)
    VALUES (v_user_id, 'Aksessuar: ' || p_item_key, 'cosmetic', -v_price, p_item_key);

    RETURN json_build_object(
        'ok', true,
        'new_balance', v_new_bal
    );
END;
$$;

-- 4. purchase_cosmetic_upsell (Chegirmali aksessuar xaridi)
CREATE OR REPLACE FUNCTION public.purchase_cosmetic_upsell(p_item_key TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_cur_hbc INT;
    v_price INT := 30;
    v_new_bal INT;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Avtorizatsiyadan o''ting';
    END IF;

    SELECT COALESCE(hbc, 0) INTO v_cur_hbc FROM public.profiles WHERE id = v_user_id FOR UPDATE;
    IF v_cur_hbc < v_price THEN
        RAISE EXCEPTION 'HBC yetarli emas';
    END IF;

    v_new_bal := v_cur_hbc - v_price;

    UPDATE public.profiles SET hbc = v_new_bal, updated_at = NOW() WHERE id = v_user_id;

    INSERT INTO public.cosmetic_purchases (user_id, item_key, price_hbc)
    VALUES (v_user_id, p_item_key, v_price)
    ON CONFLICT (user_id, item_key) DO NOTHING;

    RETURN json_build_object(
        'ok', true,
        'new_balance', v_new_bal,
        'price_hbc', v_price
    );
END;
$$;

-- 5. purchase_shop_item (Do'kon buyumlari xaridi)
CREATE OR REPLACE FUNCTION public.purchase_shop_item(p_item_id BIGINT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_cur_hbc INT;
    v_price INT := 50;
    v_new_bal INT;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Avtorizatsiyadan o''ting';
    END IF;

    SELECT COALESCE(hbc, 0) INTO v_cur_hbc FROM public.profiles WHERE id = v_user_id FOR UPDATE;
    IF v_cur_hbc < v_price THEN
        RAISE EXCEPTION 'HBC yetarli emas';
    END IF;

    v_new_bal := v_cur_hbc - v_price;

    UPDATE public.profiles SET hbc = v_new_bal, updated_at = NOW() WHERE id = v_user_id;

    INSERT INTO public.shop_item_purchases (profile_id, item_id)
    VALUES (v_user_id, p_item_id)
    ON CONFLICT (profile_id, item_id) DO NOTHING;

    RETURN json_build_object(
        'ok', true,
        'new_balance', v_new_bal
    );
END;
$$;

-- 6. purchase_background (Fon xaridi)
CREATE OR REPLACE FUNCTION public.purchase_background(p_background_id TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_cur_hbc INT;
    v_price INT := 50;
    v_new_bal INT;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Avtorizatsiyadan o''ting';
    END IF;

    SELECT COALESCE(hbc, 0) INTO v_cur_hbc FROM public.profiles WHERE id = v_user_id FOR UPDATE;
    IF v_cur_hbc < v_price THEN
        RAISE EXCEPTION 'HBC yetarli emas';
    END IF;

    v_new_bal := v_cur_hbc - v_price;

    UPDATE public.profiles SET hbc = v_new_bal, updated_at = NOW() WHERE id = v_user_id;

    INSERT INTO public.background_purchases (user_id, background_id)
    VALUES (v_user_id, p_background_id)
    ON CONFLICT (user_id, background_id) DO NOTHING;

    RETURN json_build_object(
        'ok', true,
        'new_balance', v_new_bal
    );
END;
$$;

-- 7. purchase_model (3D Model xaridi)
CREATE OR REPLACE FUNCTION public.purchase_model(p_model_id TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_cur_hbc INT;
    v_price INT := 50;
    v_new_bal INT;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Avtorizatsiyadan o''ting';
    END IF;

    SELECT COALESCE(hbc, 0) INTO v_cur_hbc FROM public.profiles WHERE id = v_user_id FOR UPDATE;
    IF v_cur_hbc < v_price THEN
        RAISE EXCEPTION 'HBC yetarli emas';
    END IF;

    v_new_bal := v_cur_hbc - v_price;

    UPDATE public.profiles SET hbc = v_new_bal, updated_at = NOW() WHERE id = v_user_id;

    INSERT INTO public.model_purchases (profile_id, model_id)
    VALUES (v_user_id, p_model_id)
    ON CONFLICT (profile_id, model_id) DO NOTHING;

    RETURN json_build_object(
        'ok', true,
        'new_balance', v_new_bal
    );
END;
$$;

-- 8. get_player_cosmetics (O'yinchi taqqan aksessuarlarini olish)
CREATE OR REPLACE FUNCTION public.get_player_cosmetics(p_user_id UUID)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_slots JSONB;
BEGIN
    SELECT slots INTO v_slots FROM public.player_cosmetics WHERE user_id = p_user_id;
    RETURN COALESCE(v_slots, '{}'::jsonb);
END;
$$;

-- Barcha RPC funksiyalarga ruxsat berish
GRANT EXECUTE ON FUNCTION public.purchase_launcher_pro() TO authenticated;
GRANT EXECUTE ON FUNCTION public.my_launcher_pro() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.purchase_cosmetic(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.purchase_cosmetic_upsell(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.purchase_shop_item(BIGINT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.purchase_background(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.purchase_model(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_player_cosmetics(UUID) TO authenticated, anon;

-- ==============================================================================
-- TUGADI! Ushbu skript bajarilgach, NeoTerra Launcher do'koni 100% Supabase bazasiga ulanadi.
-- ==============================================================================
