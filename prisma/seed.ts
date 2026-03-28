import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import bcrypt from 'bcryptjs';

const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('trojancc2026', 10);
  await prisma.user.upsert({
    where: { email: 'admin@trojancc.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@trojancc.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  // Create teams
  const team1 = await prisma.team.upsert({
    where: { id: 'team-1' },
    update: {},
    create: { id: 'team-1', name: 'Trojans Pacific', shortName: 'T1' },
  });
  const team2 = await prisma.team.upsert({
    where: { id: 'team-2' },
    update: {},
    create: { id: 'team-2', name: 'Trojans United', shortName: 'T2' },
  });

  // Create season
  const season = await prisma.season.upsert({
    where: { id: 'summer-2026' },
    update: {},
    create: {
      id: 'summer-2026',
      name: 'Summer 2026',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2026-09-30'),
      isActive: true,
    },
  });

  // Create players with real data
  const players = [
    { playerId: 'P01', fullName: 'Dhruv Channa', email: 'channa.dhruv@gmail.com', usaCricketId: null, primaryTeam: 'both' },
    { playerId: 'P02', fullName: 'Karan Sidhu', email: 'ksidhu@outlook.com', usaCricketId: '390931', primaryTeam: 'T1' },
    { playerId: 'P03', fullName: 'Vasu Gupta', email: 'vasu.gupta.p@gmail.com', usaCricketId: '568153', primaryTeam: 'T1' },
    { playerId: 'P04', fullName: 'Ratik Sachdeva', email: 'ratik.sachdeva@gmail.com', usaCricketId: '1723452', primaryTeam: 'T1' },
    { playerId: 'P05', fullName: 'Tej Sidhu', email: 'tejs@ymail.com', usaCricketId: '6365956', primaryTeam: 'T1' },
    { playerId: 'P06', fullName: 'Akshit Mehta', email: 'mehtaakshit7@gmail.com', usaCricketId: '1968732', primaryTeam: 'T1' },
    { playerId: 'P07', fullName: 'Rohit Bhamidipati', email: 'rbhamidi2000@gmail.com', usaCricketId: '1806558', primaryTeam: 'T2' },
    { playerId: 'P08', fullName: 'Abhinandhan Narayanan', email: 'abhinandhan8@gmail.com', usaCricketId: '1940521', primaryTeam: 'T2' },
    { playerId: 'P09', fullName: 'Sachin Paka', email: 'escaflowne2711@gmail.com', usaCricketId: '654922', primaryTeam: 'T1' },
    { playerId: 'P10', fullName: 'Sriram Subramanian', email: 'srirams1217@gmail.com', usaCricketId: '6365728', primaryTeam: 'T1' },
    { playerId: 'P11', fullName: 'Surendra TS', email: 'surendrats1999@gmail.com', usaCricketId: '5031395', primaryTeam: 'T2' },
    { playerId: 'P12', fullName: 'Ajay MS', email: 'ajayms.005@gmail.com', usaCricketId: '413519', primaryTeam: 'T2' },
    { playerId: 'P13', fullName: 'Krithin Arukala', email: 'krithinarukala@gmail.com', usaCricketId: '6365944', primaryTeam: 'T1' },
    { playerId: 'P14', fullName: 'Parth Gupta', email: 'parth.gupta.v@gmail.com', usaCricketId: '568152', primaryTeam: 'T1' },
    { playerId: 'P15', fullName: 'Manideep Nandina', email: 'Manideepn2022@gmail.com', usaCricketId: '5169607', primaryTeam: 'T2' },
    { playerId: 'P16', fullName: 'Ashrit Kasu', email: 'ashritk0809@gmail.com', usaCricketId: '5044138', primaryTeam: 'T1' },
    { playerId: 'P17', fullName: 'Raman Kumar', email: 'Moonraman123@gmail.com', usaCricketId: '1199408', primaryTeam: 'T2' },
    { playerId: 'P18', fullName: 'Pranav Dadi', email: 'Dadipranav@gmail.com', usaCricketId: '603129', primaryTeam: 'T1' },
    { playerId: 'P19', fullName: 'Chirag Gupta', email: 'Vasukansal634@gmail.com', usaCricketId: '6366468', primaryTeam: 'T2' },
    { playerId: 'P20', fullName: 'Harsh Patel', email: 'patelharsh.patel19@gmail.com', usaCricketId: '4488213', primaryTeam: 'T2' },
    { playerId: 'P21', fullName: 'Rahul Cariappa', email: 'cp.rahul.cariappa@gmail.com', usaCricketId: '4468145', primaryTeam: 'T1' },
    { playerId: 'P22', fullName: 'Rohan Gulhar', email: 'rgulhar1@gmail.com', usaCricketId: '6366617', primaryTeam: 'T2' },
    { playerId: 'P23', fullName: 'Nikhil Gangrade', email: 'nikhil12gangrade93@yahoo.com', usaCricketId: '3079626', primaryTeam: 'T1' },
    { playerId: 'P24', fullName: 'Mufaddal Daginawala', email: 'Muffi.daginawala@gmail.com', usaCricketId: '2024136', primaryTeam: 'T2' },
    { playerId: 'P25', fullName: 'Sameer Thorat', email: 'sameer931025@gmail.com', usaCricketId: '4786826', primaryTeam: 'T1' },
    { playerId: 'P26', fullName: 'Sai Saran', email: null, usaCricketId: null, primaryTeam: 'T2' },
    { playerId: 'P27', fullName: 'Kavish Purohit', email: 'kavishpurohit20@gmail.com', usaCricketId: '6367335', primaryTeam: 'T1' },
    { playerId: 'P28', fullName: 'Romil Karia', email: null, usaCricketId: null, primaryTeam: 'T2' },
    { playerId: 'P29', fullName: 'Prem Dhoot', email: null, usaCricketId: null, primaryTeam: 'T1' },
    { playerId: 'P30', fullName: 'Rishab Jay', email: null, usaCricketId: null, primaryTeam: 'T1' },
    { playerId: 'P31', fullName: 'Vivek Krishnagiri', email: null, usaCricketId: null, primaryTeam: 'T2' },
    { playerId: 'P32', fullName: 'Sidhant Kabra', email: null, usaCricketId: '2623431', primaryTeam: 'T1' },
  ];

  for (const p of players) {
    const player = await prisma.player.upsert({
      where: { playerId: p.playerId },
      update: {},
      create: {
        playerId: p.playerId,
        fullName: p.fullName,
        email: p.email,
        usaCricketId: p.usaCricketId,
        paymentPlan: 'Season Dues',
        duesPaid: 'Unpaid',
      },
    });

    if (p.primaryTeam === 'both') {
      await prisma.playerTeam.upsert({
        where: { playerId_teamId: { playerId: player.id, teamId: team1.id } },
        update: {},
        create: { playerId: player.id, teamId: team1.id, isPrimary: true },
      });
      await prisma.playerTeam.upsert({
        where: { playerId_teamId: { playerId: player.id, teamId: team2.id } },
        update: {},
        create: { playerId: player.id, teamId: team2.id, isPrimary: true },
      });
    } else {
      const teamId = p.primaryTeam === 'T1' ? team1.id : team2.id;
      await prisma.playerTeam.upsert({
        where: { playerId_teamId: { playerId: player.id, teamId } },
        update: {},
        create: { playerId: player.id, teamId, isPrimary: true },
      });
    }
  }

  // Create sample money records (W25 carry-overs)
  const moneyRecords = [
    { description: 'Cricket Stumps (Set of 2)', amount: 45.00, status: 'Paid', owedBy: 'Club', notes: 'W25 carry-over' },
    { description: 'Umpire Fee - Game 1', amount: 60.00, status: 'Paid', owedBy: 'Club', notes: 'W25 carry-over' },
    { description: 'Umpire Fee - Game 2', amount: 60.00, status: 'Paid', owedBy: 'Club', notes: 'W25 carry-over' },
    { description: 'BACA Registration - T1', amount: 200.00, status: 'Paid', owedBy: 'Club', notes: 'W25 carry-over' },
    { description: 'BACA Registration - T2', amount: 200.00, status: 'Paid', owedBy: 'Club', notes: 'W25 carry-over' },
    { description: 'Match Balls (Box of 6)', amount: 85.00, status: 'Unpaid', owedBy: 'Club', notes: 'W25 carry-over' },
  ];

  for (const record of moneyRecords) {
    await prisma.moneyRecord.create({ data: record });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
