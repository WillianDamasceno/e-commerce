-- Drop foreign key constraints first
ALTER TABLE login DROP CONSTRAINT IF EXISTS login_codigo_cliente_fkey;
ALTER TABLE pedidos DROP CONSTRAINT IF EXISTS pedidos_codigo_cliente_fkey;
ALTER TABLE item_pedido DROP CONSTRAINT IF EXISTS item_pedido_codigo_pedido_fkey;
ALTER TABLE item_pedido DROP CONSTRAINT IF EXISTS item_pedido_codigo_produto_fkey;

-- Drop tables
DROP TABLE IF EXISTS item_pedido;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS login;
DROP TABLE IF EXISTS cliente;