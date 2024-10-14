-- AlterEnum
ALTER TYPE "QuoteStatus" ADD VALUE 'Paid';

-- AlterTable
ALTER TABLE "Quote" ALTER COLUMN "status" SET DEFAULT 'Quote';
