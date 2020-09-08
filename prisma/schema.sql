DROP TABLE IF EXISTS "MediaType";
CREATE TABLE "MediaType"
(
    "alias" CHAR(16) NOT NULL,
    PRIMARY KEY ("alias")
);

DROP TABLE IF EXISTS "Media";
CREATE TABLE "Media"
(
    "id"        SERIAL PRIMARY KEY,
    "filename"  VARCHAR(255) NOT NULL,
    "name"      CHAR(60)     NOT NULL,
    "size"      INTEGER      NOT NULL,
    "type"      CHAR(16)     NOT NULL,
    "createdAt" TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("type") REFERENCES "MediaType" ("alias") ON DELETE CASCADE
);

DROP TABLE IF EXISTS "User";
CREATE TABLE "User"
(
    "id"        SERIAL PRIMARY KEY,
    "name"      VARCHAR(255)                 DEFAULT NULL,
    "email"     VARCHAR(255) UNIQUE NOT NULL,
    "password"  VARCHAR(255)        NOT NULL,
    "createdAt" TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS "PackStatus";
CREATE TABLE "PackStatus"
(
    "alias" CHAR(16) NOT NULL,
    PRIMARY KEY ("alias")
);

DROP TABLE IF EXISTS "Pack";
CREATE TABLE "Pack"
(
    "id"        SERIAL PRIMARY KEY,
    "hash"      VARCHAR(60) UNIQUE NOT NULL,
    "authorId"  INTEGER            NOT NULL,
    "title"     VARCHAR(255)       NOT NULL,
    "status"    CHAR(16)           NOT NULL,
    "createdAt" TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
    "deletedAt" TIMESTAMPTZ        NOT NULL DEFAULT NULL,
    FOREIGN KEY ("status") REFERENCES "PackStatus" ("alias") ON DELETE CASCADE,
    FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE
);

DROP TABLE IF EXISTS "Round";
CREATE TABLE "Round"
(
    "id"      SERIAL PRIMARY KEY,
    "packId"  INTEGER NOT NULL,
    "timeout" SMALLINT         DEFAULT NULL,
    "isFinal" BOOLEAN NOT NULL DEFAULT 'false',
    FOREIGN KEY ("packId") REFERENCES "Pack" ("id") ON DELETE CASCADE
);

DROP TABLE IF EXISTS "Category";
CREATE TABLE "Category"
(
    "id"      SERIAL PRIMARY KEY,
    "hash"    VARCHAR(60) UNIQUE NOT NULL,
    "title"   VARCHAR(255)       NOT NULL,
    "roundId" INTEGER            NOT NULL,
    FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE CASCADE
);

DROP TABLE IF EXISTS "QuestionType";
CREATE TABLE "QuestionType"
(
    "alias" CHAR(16) NOT NULL,
    PRIMARY KEY ("alias")
);

DROP TABLE IF EXISTS "Question";
CREATE TABLE "Question"
(
    "id"            SERIAL PRIMARY KEY,
    "hash"          VARCHAR(60) UNIQUE NOT NULL,
    "categoryId"    INTEGER            NOT NULL,
    "text"          TEXT,
    "answer"        TEXT,
    "price"         SMALLINT           NOT NULL,
    "type"          CHAR(16)           NOT NULL,
    "timeout"       SMALLINT DEFAULT NULL,
    "imageId"       INTEGER  DEFAULT NULL,
    "audioId"       INTEGER  DEFAULT NULL,
    "answerImageId" INTEGER  DEFAULT NULL,
    FOREIGN KEY ("answerImageId") REFERENCES "Media" ("id") ON DELETE SET NULL,
    FOREIGN KEY ("audioId") REFERENCES "Media" ("id") ON DELETE SET NULL,
    FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("imageId") REFERENCES "Media" ("id") ON DELETE SET NULL,
    FOREIGN KEY ("type") REFERENCES "QuestionType" ("alias") ON DELETE CASCADE
);

CREATE TABLE "_PackToUser"
(
    "A" integer NOT NULL REFERENCES "Pack" ("id"),
    "B" integer NOT NULL REFERENCES "User" ("id")
);
CREATE UNIQUE INDEX "_PackToUser_AB_unique" ON "_PackToUser" ("A" int4_ops, "B" int4_ops);

-- INSERT INTO media_types VALUES ('audio'),('image');
-- INSERT INTO pack_statuses VALUES ('complete'),('progress'),('published');
