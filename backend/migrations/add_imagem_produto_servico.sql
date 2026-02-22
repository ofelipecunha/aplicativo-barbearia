-- Adiciona coluna imagem (VARCHAR 500) em produto e servico.
-- Execute manualmente se necessário (GORM AutoMigrate também adiciona ao alterar os models).

ALTER TABLE produto
ADD COLUMN imagem VARCHAR(500);

ALTER TABLE servico
ADD COLUMN imagem VARCHAR(500);
