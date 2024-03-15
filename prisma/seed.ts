/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { hashPwd } from '../src/lib/password';

const prisma = new PrismaClient();

async function createPages() {
  await prisma.page.upsert({
    where: { name: 'home' },
    update: {},
    create: {
      name: 'home',
      title: 'Home',
      content:
        '<h3>Overview</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper, nunc euismod molestie hendrerit, elit libero lacinia est, vitae elementum turpis sapien a libero. Integer efficitur, nisi nec interdum consequat, magna dolor sodales magna, eu fermentum libero eros in est.</p><h4>Coordination Team</h4><p><strong>A. Lorem</strong>, Department of Lorem Ipsum, Faculty of Dolor Sit Amet, Consectetur Adipiscing University</p><p>lorem.ipsum (at) domain.com</p><p><strong>B. Ipsum</strong>, Department of Dolor Sit, Faculty of Amet Adipiscing, Consectetur Adipiscing University</p><p>dolor.ipsum (at) domain.com</p><p><strong>C. Dolor</strong>, Department of Sit Amet, Faculty of Adipiscing Consectetur, Consectetur Adipiscing University</p><p>sit.amet (at) domain.com</p><p><strong>D. Sit</strong>, Department of Amet Adipiscing, Faculty of Consectetur, Consectetur Adipiscing University</p><p>amet.dolor (at) domain.com</p><p><strong>E. Amet</strong>, Department of Consectetur Adipiscing, Faculty of Ipsum Dolor, Consectetur Adipiscing University</p><p>consectetur.adipiscing (at) domain.com</p><h4>Event Secretariat</h4><p>F. Ipsum Lorem, Department of Sit Amet, Faculty of Dolor Sit, Consectetur Adipiscing University</p><h4>Organizational Team</h4><p><strong>G. Lorem, H. Ipsum, I. Dolor, J. Sit, K. Amet, L. Consectetur, M. Adipiscing</strong></p><h4>Registrationn</h4><p>Conference fee: <strong>3000 EUR for onsite participation, 0 EUR for online participation</strong><br>Apply through the registration form: <a href="register" rel="noopener noreferrer nofollow">Registration Form</a><br>Deadline: <strong>June 30, 2050</strong></p><p>Essential registration details:</p><ol><li><p>Full Name</p></li><li><p>Your contact address and e-mail</p></li><li><p>Affiliation</p></li><li><p>The abstract of your contribution</p></li><li><p>Onsite/Online attendance</p></li><li><p>Expected arrival and departure dates</p></li></ol><h4>Credits</h4><p>This occasion is funded by the grant from the Lorem Ipsum Dolor Sit Amet University No. LID 123/45/6789</p>',
      order: 1,
    },
  });
  await prisma.page.upsert({
    where: { name: 'register' },
    update: {},
    create: {
      name: 'register',
      title: 'Register',
      content:
        '<h3>Registration</h3><p><strong>Deadline:</strong> June 30, 2050<br><strong>Conference fee:</strong> 3000 EUR for onsite participation, 0 EUR for online participation</p><p></p><p><strong>Registration data:</strong></p><ol><li><p>Name</p></li><li><p>Your contact address and e-mail</p></li><li><p>Affiliation</p></li><li><p>The abstract of your contribution</p></li><li><p>Onsite/Online attendance</p></li><li><p>Arrival and departure dates</p></li></ol>',
      order: 2,
    },
  });
  await prisma.page.upsert({
    where: { name: 'participants' },
    update: {},
    create: {
      name: 'participants',
      title: 'Participants & Abstracts',
      content: '<h3>Participants and abstracts</h3>',
      order: 3,
    },
  });
  await prisma.page.upsert({
    where: { name: 'programme' },
    update: {},
    create: {
      name: 'programme',
      title: 'Programme',
      content:
        '<h3>Programme</h3><h4>Conference venue:</h4><p>The conference venue: <strong>address</strong><br>or<strong>online: will be specified</strong></p><h4>Special talks</h4><p>Invited oral presentation duration is 30 min = 25 min talk + 5 min for discussion.</p><h4>Regular talks</h4><p>Oral presentation duration is 20 min = max 15 min talk + 5 min for discussion.</p>',
      order: 4,
    },
  });
  await prisma.page.upsert({
    where: { name: 'travel' },
    update: {},
    create: {
      name: 'travel',
      title: 'Travel',
      content:
        '<h4>Preferred Shuttle:</h4><p>Hyperloop HLX 500, 08:45 from New Genesis Central Station. Or HLX 520, 11:15.</p><h4>From Arcadia Terminal to the event location:</h4><p><strong>By Monorail</strong></p><p>Ride the monorail line <strong>M3</strong>, <strong>M5</strong>, <strong>M7</strong> to <strong>Elysium Fields</strong> stop (5th stop).<br>The ticket costs 30 Credits, payable on the monorail.<br>Please have the exact amount ready.<br>Entry is via the central pod door only.</p><p><strong>By Foot</strong></p><p>Approximately 2 km</p><ol><li><p>Proceed north on Harmony Ave towards Tranquility Lane (0.4 km)</p></li><li><p>Continue straight onto Serenity Path (0.3 km)</p></li><li><p>At the water fountain, take a left onto Utopia Parkway (0.5 km)</p></li><li><p>Make a slight right to stay on Utopia Parkway (0.3 km)</p></li><li><p>Turn left at Zenith Plaza (0.4 km)</p></li><li><p>Take the 1st right onto Celestial Circle (70 m)</p></li><li><p>Continue onto Starlight Avenue (0.1 km)</p></li><li><p>Turn left at Nova Square (50 m)</p></li><li><p>Gently right onto Cosmos Court</p></li></ol><p>The venue will be on your right</p>',
      order: 5,
    },
  });
  await prisma.page.upsert({
    where: { name: 'gallery' },
    update: {},
    create: {
      name: 'gallery',
      title: 'Gallery',
      content: '<h3>Gallery</h3>',
      order: 6,
    },
  });

  console.log('Pages created');
}

async function createAdmins() {
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@lorem.ipsum',
      password: await hashPwd('123456'),
    },
  });
  await prisma.admin.upsert({
    where: { username: 'uTRuside' },
    update: {},
    create: {
      username: 'uTRuside',
      email: 'uTRuside@lorem.ipsum',
      password: await hashPwd('123456'),
    },
  });
  await prisma.admin.upsert({
    where: { username: 'EANdoteo' },
    update: {},
    create: {
      username: 'EANdoteo',
      email: 'EANdoteo@lorem.ipsum',
      password: await hashPwd('123456'),
    },
  });
  await prisma.admin.upsert({
    where: { username: 'NdcHrenT' },
    update: {},
    create: {
      username: 'NdcHrenT',
      email: 'NdcHrenT@lorem.ipsum',
      password: await hashPwd('123456'),
    },
  });
  await prisma.admin.upsert({
    where: { username: 'yElItupl' },
    update: {},
    create: {
      username: 'yElItupl',
      email: 'yElItupl@lorem.ipsum',
      password: await hashPwd('123456'),
    },
  });
  await prisma.admin.upsert({
    where: { username: 'sTERAdbu' },
    update: {},
    create: {
      username: 'sTERAdbu',
      email: 'sTERAdbu@lorem.ipsum',
      password: await hashPwd('123456'),
    },
  });

  console.log('Admins created');
}

async function createSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { option: 'title' },
    update: {},
    create: {
      option: 'title',
      value: 'Lorem Ipsum conference',
      order: 1,
    },
  });
  await prisma.siteSettings.upsert({
    where: { option: 'date' },
    update: {},
    create: {
      option: 'date',
      value: 'July 15 - 20, 2050.',
      order: 2,
    },
  });
  await prisma.siteSettings.upsert({
    where: { option: 'location' },
    update: {},
    create: {
      option: 'location',
      value: 'Somewhere + Online',
      order: 3,
    },
  });
  await prisma.siteSettings.upsert({
    where: { option: 'address department' },
    update: {},
    create: {
      option: 'address department',
      value: 'Department of Something, Somewhere',
      order: 4,
    },
  });
  await prisma.siteSettings.upsert({
    where: { option: 'address faculty' },
    update: {},
    create: {
      option: 'address faculty',
      value: 'Faculty of Something, Somewhere',
      order: 5,
    },
  });

  console.log('Site settings created');
}

async function createParticipantsAndAbstracts() {
  await prisma.participant.upsert({
    where: { email: 'nicolecox@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Nicole Cox',
      email: 'nicolecox@lorem.ipsum',
      affiliation: 'Department of Non',
      participation: 'ONLINE',
      mailingAddress: 'nicolecox@lorem.ipsum',
      student: true,
      additionalMessage: 'Looking forward to the conference!',
      abstract: {
        create: {
          title: 'Lorem Ipsum Dolor Sit Amet',
          additionalAuthors: 'J. Doe',
          affiliationAuthors: 'Department of Non',
          abstract:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      },
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'justinwhite@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Justin White',
      email: 'justinwhite@lorem.ipsum',
      affiliation: 'Faculty of Qui',
      participation: 'ONSITE',
      mailingAddress: 'justinwhite@lorem.ipsum',
      student: false,
      additionalMessage: 'Excited to meet everyone at the conference!',
      abstract: {
        create: {
          title: 'Nanomaterials in Medicine',
          additionalAuthors: 'M. Smith',
          affiliationAuthors: 'Insitute of Nanotechnology',
          abstract:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      },
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'michaelmitchell@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Michael Mitchell',
      email: 'michaelmitchell@lorem.ipsum',
      affiliation: 'Department of Dolor',
      participation: 'ONLINE',
      mailingAddress: 'michaelmitchell@lorem.ipsum',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Artificial Intelligence in Ecology',
          additionalAuthors: 'L. Johnson',
          affiliationAuthors: 'Center for AI Research',
          abstract:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      },
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'gregoryjohnston@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Gregory Johnston',
      email: 'gregoryjohnston@lorem.ipsum',
      affiliation: 'Department of Et',
      participation: 'ONSITE',
      mailingAddress: 'gregoryjohnston@lorem.ipsum',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Space Habitat Designs',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
      },
      poster: false,
      invited: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'christopherpollard@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Christopher Pollard',
      email: 'christopherpollard@lorem.ipsum',
      affiliation: 'Department of Adipiscing',
      participation: 'ONSITE',
      mailingAddress: 'christopherpollard@lorem.ipsum',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Cryptographic Techniques for Secure Communication',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit.',
        },
      },
      poster: false,
      invited: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'jeremywest@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Jeremy West',
      email: 'jeremywest@lorem.ipsum',
      affiliation: 'Department of Culpa',
      participation: 'ONLINE',
      mailingAddress: 'jeremywest@lorem.ipsum',
      student: false,
      additionalMessage: 'I look forward to meeting you all!',
      abstract: {
        create: {
          title: 'Renewable Energy Systems',
          additionalAuthors: 'E. Brown',
          affiliationAuthors: 'Department of Quantum Computing',
          abstract:
            'Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi. Morbi auctor lorem non justo.',
        },
      },
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'jacobboyer@lorem.ipsum' },
    update: { additionalMessage: 'Looking forward to the conference!' },
    create: {
      fullName: 'Jacob Boyer',
      email: 'jacobboyer@lorem.ipsum',
      affiliation: 'Department of Commondo',
      participation: 'ONLINE',
      mailingAddress: '123 Main Street',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Gene Editing and CRISPR Technology',
          additionalAuthors: 'Jane Smith',
          affiliationAuthors: 'XYZ Corp',
          abstract:
            'Aliquam sit amet felis. Mauris semper, velit semper laoreet dictum, quam diam dictum urna.',
        },
      },
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'calebwallace@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Caleb Wallace',
      email: 'calebwallace@lorem.ipsum',
      affiliation: 'University of Quis',
      participation: 'ONSITE',
      mailingAddress: '456 Elm Street',
      student: false,
      additionalMessage:
        'Please let me know if there are any travel restrictions for the conference.',
      abstract: {
        create: {
          title: 'Virtual Reality Learning Environments',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'Nec risus turpis, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.',
        },
      },
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'vanessahernandez@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Vanessa Hernandez',
      email: 'vanessahernandez@lorem.ipsum',
      affiliation: 'University of Dolor',
      participation: 'ONSITE',
      mailingAddress: '789 Oak Street',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Autonomous Vehicle Navigation',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.',
        },
      },
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'michaelbauer@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Michael Bauer',
      email: 'michaelbauer@lorem.ipsum',
      affiliation: 'Duis Corporation',
      participation: 'ONLINE',
      mailingAddress: '101 Main Street',
      student: false,
      additionalMessage: 'Looking forward to the conference!',
      abstract: {
        create: {
          title: 'Blockchain and Financial Technologies',
          additionalAuthors: 'Mary Johnson',
          affiliationAuthors: 'Cybersecurity Institute',
          abstract:
            'Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor.',
        },
      },
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'mariefletcher@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Marie Fletcher',
      email: 'mariefletcher@lorem.ipsum',
      affiliation: 'Magna',
      participation: 'ONLINE',
      mailingAddress: 'mariefletcher@lorem.ipsum',
      student: false,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Robotics in Healthcare',
          additionalAuthors: 'M. Smith',
          affiliationAuthors: 'Department of Quantum Computing',
          abstract:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      },
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'jacobwerner@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Jacob Werner',
      email: 'jacobwerner@lorem.ipsum',
      affiliation: 'Eiusmod in Veniam',
      participation: 'ONSITE',
      mailingAddress: 'jacobwerner@lorem.ipsum',
      student: true,
      additionalMessage: 'Excited to present my work at the conference!',
      abstract: {
        create: {
          title: 'Sustainable Urban Planning',
          additionalAuthors: 'J. Doe',
          affiliationAuthors: 'Institute of Nanotechnology',
          abstract:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      },
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'meganporter@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Megan Porter',
      email: 'meganporter@lorem.ipsum',
      affiliation: 'Eiusmod in Veniam',
      participation: 'ONLINE',
      mailingAddress: 'meganporter@lorem.ipsum',
      student: true,
      additionalMessage: 'Looking forward to the conference!',
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'jonathanwilson@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'Jonathan Wilson',
      email: 'jonathanwilson@lorem.ipsum',
      affiliation: 'Department of Sit',
      participation: 'ONLINE',
      mailingAddress: '159 Nathaniel Views Apt. 318, West Joshua, WA 45046',
      student: true,
      additionalMessage: '',
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'jamesbuchanan@lorem.ipsum' },
    update: {},
    create: {
      fullName: 'James Buchanan',
      email: 'jamesbuchanan@lorem.ipsum',
      affiliation: 'Faculty of Amet',
      participation: 'ONSITE',
      mailingAddress: '',
      student: true,
      additionalMessage: '',
      poster: true,
    },
  });

  console.log('Created participants and abstracts');
}

async function createProgramme() {
  // fetch participants
  const participantsAndAbstracts = await prisma.participant.findMany({
    include: { abstract: true },
  });

  const programme = await prisma.programme.upsert({
    where: { id: 'programme' },
    update: {},
    create: {
      id: 'programme',
      conferenceStart: '2050-06-30T22:00:00.000Z',
    },
  });

  // first day
  await prisma.programmeDay.upsert({
    where: { id: 'day1' },
    update: {},
    create: {
      id: 'day1',
      date: '2050-06-30T22:00:00.000Z',
      additionalInfo: '<h4>The first day</h4>',
      start: '2024-03-12T07:00:00.000Z',
      end: '2024-03-12T09:00:00.000Z',
      programmeId: programme.id,
    },
  });

  await prisma.programmeDayItem.upsert({
    where: { id: 'item1' },
    update: {},
    create: {
      id: 'item1',
      title: '',
      type: 'CHAIRMAN',
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Jonathan Wilson',
      )?.id,
      abstractId: '',
      duration: 0,
      index: 1,
      programmeDayId: 'day1',
    },
  });
  await prisma.programmeDayItem.upsert({
    where: { id: 'item2' },
    update: {},
    create: {
      id: 'item2',
      title: 'Talk',
      type: 'ITEM',
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Michael Mitchell',
      )?.id,
      abstractId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Michael Mitchell',
      )?.abstract?.title, // Artificial Intelligence in Ecology
      duration: 30,
      index: 2,
      programmeDayId: 'day1',
    },
  });
  await prisma.programmeDayItem.upsert({
    where: { id: 'item3' },
    update: {},
    create: {
      id: 'item3',
      title: 'Talk',
      type: 'ITEM',
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Jacob Werner',
      )?.id,
      abstractId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Jacob Werner',
      )?.abstract?.title, // Sustainable Urban Planning
      duration: 30,
      index: 3,
      programmeDayId: 'day1',
    },
  });
  await prisma.programmeDayItem.upsert({
    where: { id: 'item4' },
    update: {},
    create: {
      id: 'item4',
      title: 'Break',
      type: 'ITEM',
      participantId: '',
      abstractId: '',
      duration: 15,
      index: 4,
      programmeDayId: 'day1',
    },
  });
  await prisma.programmeDayItem.upsert({
    where: { id: 'item5' },
    update: {},
    create: {
      id: 'item5',
      title: '',
      type: 'CHAIRMAN',
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Gregory Johnston',
      )?.id,
      abstractId: '',
      duration: 0,
      index: 5,
      programmeDayId: 'day1',
    },
  });
  await prisma.programmeDayItem.upsert({
    where: { id: 'item6' },
    update: {},
    create: {
      id: 'item6',
      title: 'Talk',
      type: 'ITEM',
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Christopher Pollard',
      )?.id,
      abstractId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Christopher Pollard',
      )?.abstract?.title, // Cryptographic Techniques for Secure Communication
      duration: 45,
      index: 6,
      programmeDayId: 'day1',
    },
  });

  // second day
  await prisma.programmeDay.upsert({
    where: { id: 'day2' },
    update: {},
    create: {
      id: 'day2',
      date: '2050-07-01T22:00:00.000Z',
      additionalInfo: '<h4>The second day</h4>',
      start: '2024-03-12T07:45:00.000Z',
      end: '2024-03-12T08:15:00.000Z',
      programmeId: programme.id,
    },
  });

  await prisma.programmeDayItem.upsert({
    where: { id: 'item7' },
    update: {},
    create: {
      id: 'item7',
      title: '',
      type: 'CHAIRMAN',
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Caleb Wallace',
      )?.id,
      abstractId: '',
      duration: 0,
      index: 1,
      programmeDayId: 'day2',
    },
  });
  await prisma.programmeDayItem.upsert({
    where: { id: 'item8' },
    update: {},
    create: {
      id: 'item8',
      title: 'Talk',
      type: 'ITEM',
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Vanessa Hernandez',
      )?.id,
      abstractId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Vanessa Hernandez',
      )?.abstract?.title, // Autonomous Vehicle Navigation
      duration: 30,
      index: 2,
      programmeDayId: 'day2',
    },
  });

  console.log('Pages created');
}

async function main() {
  if ((await prisma.siteSettings.count()) > 0) {
    console.log('DB already initialized, skipping');
    return;
  }

  await createPages();
  await createAdmins();
  await createSiteSettings();
  await createParticipantsAndAbstracts();
  await createProgramme();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
