CREATE TABLE IF NOT EXISTS t_p92914829_svodka24_site_projec.banners (
  id SERIAL PRIMARY KEY,
  title TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);