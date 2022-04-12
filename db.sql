CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE usuario (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    fecha DATE DEFAULT CURRENT_TIMESTAMP
);