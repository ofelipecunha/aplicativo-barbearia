-- Adiciona coluna avatar na tabela usuario (CLOB/TEXT: imagem em base64 ou data URL).
-- Execute uma vez no banco: psql -U postgres -d barbearia -f migrations/add_avatar_usuario.sql

ALTER TABLE usuario
ADD COLUMN IF NOT EXISTS avatar TEXT;

-- Converte para TEXT se a coluna já existia como VARCHAR(500)
ALTER TABLE usuario ALTER COLUMN avatar TYPE TEXT;

COMMENT ON COLUMN usuario.avatar IS 'Imagem de perfil: base64 ou data URL (data:image/jpeg;base64,...)';
