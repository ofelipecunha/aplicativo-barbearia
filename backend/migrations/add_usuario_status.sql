-- =============================================================================
-- Status do usuário: A = Aguardando aprovação | V = Validado | N = Não aprovado
-- Novos cadastros (Criar conta) entram com A; só podem logar com V.
-- =============================================================================

ALTER TABLE usuario
ADD COLUMN status VARCHAR(1) NOT NULL DEFAULT 'V';

COMMENT ON COLUMN usuario.status IS 'A=Aguardando, V=Validado, N=Não aprovado. Só usuários com V podem logar.';

-- Deixa todos os usuários existentes como Validados
UPDATE usuario SET status = 'V' WHERE status IS NULL OR status = '';
