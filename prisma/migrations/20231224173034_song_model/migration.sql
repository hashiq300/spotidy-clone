/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "spotify_artists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "spotify_artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spotify_songs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artistId" TEXT,
    "image" TEXT NOT NULL,
    "songUrl" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spotify_songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spotify_email_whitelist" (
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spotify_email_whitelist_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "spotify_liked_songs" (
    "id" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "likedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spotify_liked_songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spotify_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "spotify_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spotify_sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spotify_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spotify_users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "spotify_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spotify_verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "artist_name" ON "spotify_artists"("name");

-- CreateIndex
CREATE INDEX "song_title" ON "spotify_songs"("title");

-- CreateIndex
CREATE UNIQUE INDEX "spotify_liked_songs_songId_likedById_key" ON "spotify_liked_songs"("songId", "likedById");

-- CreateIndex
CREATE UNIQUE INDEX "spotify_accounts_provider_providerAccountId_key" ON "spotify_accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "spotify_sessions_sessionToken_key" ON "spotify_sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "spotify_users_email_key" ON "spotify_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "spotify_verification_tokens_token_key" ON "spotify_verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "spotify_verification_tokens_identifier_token_key" ON "spotify_verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "spotify_songs" ADD CONSTRAINT "spotify_songs_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "spotify_artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spotify_songs" ADD CONSTRAINT "spotify_songs_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "spotify_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spotify_liked_songs" ADD CONSTRAINT "spotify_liked_songs_songId_fkey" FOREIGN KEY ("songId") REFERENCES "spotify_songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spotify_liked_songs" ADD CONSTRAINT "spotify_liked_songs_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "spotify_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spotify_accounts" ADD CONSTRAINT "spotify_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "spotify_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spotify_sessions" ADD CONSTRAINT "spotify_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "spotify_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
