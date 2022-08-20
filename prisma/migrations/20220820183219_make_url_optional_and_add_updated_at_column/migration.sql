-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlIndex" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Link" ("createdAt", "id", "url", "urlIndex") SELECT "createdAt", "id", "url", "urlIndex" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_urlIndex_key" ON "Link"("urlIndex");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
