CREATE TABLE cliente (
    codigo_cliente INT PRIMARY KEY,
    nome VARCHAR(255),
    rua VARCHAR(255),
    numero VARCHAR(50),
    complemento VARCHAR(255),
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    uf VARCHAR(2),
    cep VARCHAR(10)
);

CREATE TABLE login (
    usuario VARCHAR(255) PRIMARY KEY,
    senha VARCHAR(255),
    codigo_cliente INT,
    FOREIGN KEY (codigo_cliente) REFERENCES cliente(codigo_cliente)
);

CREATE TABLE produtos (
    codigo_produto INT PRIMARY KEY,
    descricao VARCHAR(255),
    preco DECIMAL(10, 2),
    imagem TEXT
);

CREATE TABLE pedidos (
    codigo_pedido INT PRIMARY KEY,
    codigo_cliente INT,
    total DECIMAL(10, 2),
    FOREIGN KEY (codigo_cliente) REFERENCES cliente(codigo_cliente)
);

CREATE TABLE item_pedido (
    codigo_pedido INT,
    sequencial INT,
    codigo_produto INT,
    quantidade INT,
    total_item DECIMAL(10, 2),
    PRIMARY KEY (codigo_pedido, sequencial),
    FOREIGN KEY (codigo_pedido) REFERENCES pedidos(codigo_pedido),
    FOREIGN KEY (codigo_produto) REFERENCES produtos(codigo_produto)
);
