CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255)                 DEFAULT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    created_at TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

CREATE TABLE packs
(
    id          SERIAL PRIMARY KEY,
    hash        VARCHAR(60) UNIQUE NOT NULL,
    author_id   INTEGER            NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    title       VARCHAR(255)       NOT NULL,
    timeout     SMALLINT                    DEFAULT NULL,
    isPublished BOOLEAN            NOT NULL DEFAULT 'false',
    created_at  TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ                 DEFAULT NULL
);

CREATE TABLE rounds
(
    id       SERIAL PRIMARY KEY,
    pack_id  INTEGER NOT NULL REFERENCES packs (id) ON DELETE CASCADE,
    timeout  SMALLINT         DEFAULT NULL,
    is_final BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE categories
(
    id       SERIAL PRIMARY KEY,
    hash     VARCHAR(60) UNIQUE NOT NULL,
    title    VARCHAR(255)       NOT NULL,
    round_id INTEGER            NOT NULL REFERENCES rounds (id) ON DELETE CASCADE
);

CREATE TABLE questions
(
    id           SERIAL PRIMARY KEY,
    hash         VARCHAR(60) UNIQUE NOT NULL,
    category_id  INTEGER            NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
    text         TEXT,
    answer       TEXT,
    price        SMALLINT           NOT NULL,
    type         CHAR(16)           NOT NULL,
    timeout      SMALLINT    DEFAULT NULL,
    image        VARCHAR(60) DEFAULT NULL,
    image_answer VARCHAR(60) DEFAULT NULL,
    audio        VARCHAR(60) DEFAULT NULL
);

CREATE TABLE user_packs
(
    pack_id integer NOT NULL REFERENCES packs (id),
    user_id integer NOT NULL REFERENCES users (id)
);
CREATE UNIQUE INDEX pack_id_user_id_unique ON user_packs (pack_id int4_ops, user_id int4_ops);
