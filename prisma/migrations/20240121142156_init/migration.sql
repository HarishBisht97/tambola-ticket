-- CreateTable
CREATE TABLE "TambolaTicket" (
    "id" TEXT NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "ticketNumber" SERIAL NOT NULL,
    "ticketData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TambolaTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TambolaTicket_ticketNumber_key" ON "TambolaTicket"("ticketNumber");

-- CreateIndex
CREATE UNIQUE INDEX "TambolaTicket_ticketData_key" ON "TambolaTicket"("ticketData");
