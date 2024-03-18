/* eslint-disable no-console */
import { ItemType, Participation, PrismaClient } from '@prisma/client';
import { hashPwdSync } from './password';

const prisma = new PrismaClient();

async function createPages(demoUserId?: string) {
  const pages = [
    {
      name: `home-${demoUserId}`,
      title: 'Home',
      content:
        '<h3>Overview</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper, nunc euismod molestie hendrerit, elit libero lacinia est, vitae elementum turpis sapien a libero. Integer efficitur, nisi nec interdum consequat, magna dolor sodales magna, eu fermentum libero eros in est.</p><h4>Coordination Team</h4><p><strong>A. Lorem</strong>, Department of Lorem Ipsum, Faculty of Dolor Sit Amet, Consectetur Adipiscing University</p><p>lorem.ipsum (at) domain.com</p><p><strong>B. Ipsum</strong>, Department of Dolor Sit, Faculty of Amet Adipiscing, Consectetur Adipiscing University</p><p>dolor.ipsum (at) domain.com</p><p><strong>C. Dolor</strong>, Department of Sit Amet, Faculty of Adipiscing Consectetur, Consectetur Adipiscing University</p><p>sit.amet (at) domain.com</p><p><strong>D. Sit</strong>, Department of Amet Adipiscing, Faculty of Consectetur, Consectetur Adipiscing University</p><p>amet.dolor (at) domain.com</p><p><strong>E. Amet</strong>, Department of Consectetur Adipiscing, Faculty of Ipsum Dolor, Consectetur Adipiscing University</p><p>consectetur.adipiscing (at) domain.com</p><h4>Event Secretariat</h4><p>F. Ipsum Lorem, Department of Sit Amet, Faculty of Dolor Sit, Consectetur Adipiscing University</p><h4>Organizational Team</h4><p><strong>G. Lorem, H. Ipsum, I. Dolor, J. Sit, K. Amet, L. Consectetur, M. Adipiscing</strong></p><h4>Registrationn</h4><p>Conference fee: <strong>3000 EUR for onsite participation, 0 EUR for online participation</strong><br>Apply through the registration form: <a href="register" rel="noopener noreferrer nofollow">Registration Form</a><br>Deadline: <strong>June 30, 2050</strong></p><p>Essential registration details:</p><ol><li><p>Full Name</p></li><li><p>Your contact address and e-mail</p></li><li><p>Affiliation</p></li><li><p>The abstract of your contribution</p></li><li><p>Onsite/Online attendance</p></li><li><p>Expected arrival and departure dates</p></li></ol><h4>Credits</h4><p>This occasion is funded by the grant from the Lorem Ipsum Dolor Sit Amet University No. LID 123/45/6789</p>',
      order: 1,
    },
    {
      name: `register-${demoUserId}`,
      title: 'Register',
      content:
        '<h3>Registration</h3><p><strong>Deadline:</strong> June 30, 2050<br><strong>Conference fee:</strong> 3000 EUR for onsite participation, 0 EUR for online participation</p><p></p><p><strong>Registration data:</strong></p><ol><li><p>Name</p></li><li><p>Your contact address and e-mail</p></li><li><p>Affiliation</p></li><li><p>The abstract of your contribution</p></li><li><p>Onsite/Online attendance</p></li><li><p>Arrival and departure dates</p></li></ol>',
      order: 2,
    },
    {
      name: `participants-${demoUserId}`,
      title: 'Participants & Abstracts',
      content: '<h3>Participants and abstracts</h3>',
      order: 3,
    },
    {
      name: `programme-${demoUserId}`,
      title: 'Programme',
      content:
        '<h3>Programme</h3><h4>Conference venue:</h4><p>The conference venue: <strong>address</strong><br>or<strong>online: will be specified</strong></p><h4>Special talks</h4><p>Invited oral presentation duration is 30 min = 25 min talk + 5 min for discussion.</p><h4>Regular talks</h4><p>Oral presentation duration is 20 min = max 15 min talk + 5 min for discussion.</p>',
      order: 4,
    },
    {
      name: `travel-${demoUserId}`,
      title: 'Travel',
      content:
        '<h4>Preferred Shuttle:</h4><p>Hyperloop HLX 500, 08:45 from New Genesis Central Station. Or HLX 520, 11:15.</p><h4>From Arcadia Terminal to the event location:</h4><p><strong>By Monorail</strong></p><p>Ride the monorail line <strong>M3</strong>, <strong>M5</strong>, <strong>M7</strong> to <strong>Elysium Fields</strong> stop (5th stop).<br>The ticket costs 30 Credits, payable on the monorail.<br>Please have the exact amount ready.<br>Entry is via the central pod door only.</p><p><strong>By Foot</strong></p><p>Approximately 2 km</p><ol><li><p>Proceed north on Harmony Ave towards Tranquility Lane (0.4 km)</p></li><li><p>Continue straight onto Serenity Path (0.3 km)</p></li><li><p>At the water fountain, take a left onto Utopia Parkway (0.5 km)</p></li><li><p>Make a slight right to stay on Utopia Parkway (0.3 km)</p></li><li><p>Turn left at Zenith Plaza (0.4 km)</p></li><li><p>Take the 1st right onto Celestial Circle (70 m)</p></li><li><p>Continue onto Starlight Avenue (0.1 km)</p></li><li><p>Turn left at Nova Square (50 m)</p></li><li><p>Gently right onto Cosmos Court</p></li></ol><p>The venue will be on your right</p>',
      order: 5,
    },
    {
      name: `gallery-${demoUserId}`,
      title: 'Gallery',
      content: '<h3>Gallery</h3>',
      order: 6,
    },
  ];

  const requests = pages.map((page) =>
    prisma.page.create({
      data: {
        ...page,
        adminId: demoUserId,
      },
    }),
  );
  await prisma.$transaction(requests);
}

async function createAdmins(demoUserId?: string) {
  const admins = [
    {
      username: `admin-${demoUserId}`,
      email: `admin-${demoUserId}@lorem.ipsum`,
      password: '123456',
    },
    {
      username: `uTRuside-${demoUserId}`,
      email: `uTRuside-${demoUserId}@lorem.ipsum`,
      password: '123456',
    },
    {
      username: `EANdoteo-${demoUserId}`,
      email: `EANdoteo-${demoUserId}@lorem.ipsum`,
      password: '123456',
    },
    {
      username: `NdcHrenT-${demoUserId}`,
      email: `NdcHrenT-${demoUserId}@lorem.ipsum`,
      password: '123456',
    },
    {
      username: `yElItupl-${demoUserId}`,
      email: `yElItupl-${demoUserId}@lorem.ipsum`,
      password: '123456',
    },
    {
      username: `sTERAdbu-${demoUserId}`,
      email: `sTERAdbu-${demoUserId}@lorem.ipsum`,
      password: '123456',
    },
  ];

  const requests = admins.map((admin) => {
    return prisma.admin.create({
      data: {
        username: admin.username,
        email: admin.email,
        password: hashPwdSync(admin.password),
        createdByAdminId: demoUserId,
      },
    });
  });
  await prisma.$transaction(requests);
}

async function createSiteSettings(demoUserId?: string) {
  const siteSettings = [
    {
      option: `title_${demoUserId}`,
      value: 'Lorem Ipsum conference',
      order: 1,
    },
    {
      option: `date_${demoUserId}`,
      value: 'July 15 - 20, 2050.',
      order: 2,
    },
    {
      option: `location_${demoUserId}}`,
      value: 'Somewhere + Online',
      order: 3,
    },
    {
      option: `address department_${demoUserId}}`,
      value: 'Department of Something, Somewhere',
      order: 4,
    },
    {
      option: `address faculty_${demoUserId}}`,
      value: 'Faculty of Something, Somewhere',
      order: 5,
    },
  ];

  const requests = siteSettings.map((setting) =>
    prisma.siteSettings.create({
      data: {
        ...setting,
        adminId: demoUserId,
      },
    }),
  );
  await prisma.$transaction(requests);
}

async function createParticipantsAndAbstracts(demoUserId?: string) {
  const participants = [
    {
      fullName: 'Nicole Cox',
      email: `nicolecox-${demoUserId}@lorem.ipsum`,
      affiliation: 'Department of Non',
      participation: Participation.ONLINE,
      mailingAddress: 'nicolecox@lorem.ipsum',
      student: true,
      additionalMessage: 'Looking forward to the conference!',
      poster: true,
      abstract: {
        create: {
          title: 'Lorem Ipsum Dolor Sit Amet',
          additionalAuthors: 'J. Doe',
          affiliationAuthors: 'Department of Non',
          abstract:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      },
    },
    {
      fullName: 'Justin White',
      email: `justinwhite-${demoUserId}@lorem.ipsum`,
      affiliation: 'Faculty of Qui',
      participation: Participation.ONSITE,
      mailingAddress: 'justinwhite@lorem.ipsum',
      student: false,
      additionalMessage: 'Excited to meet everyone at the conference!',
      poster: false,
      abstract: {
        create: {
          title: 'Nanomaterials in Medicine',
          additionalAuthors: 'M. Smith',
          affiliationAuthors: 'Insitute of Nanotechnology',
          abstract:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      },
    },
    {
      fullName: 'Michael Mitchell',
      email: `michaelmitchell-${demoUserId}@lorem.ipsum`,
      affiliation: 'Department of Dolor',
      participation: Participation.ONLINE,
      mailingAddress: 'michaelmitchell@lorem.ipsum',
      student: true,
      additionalMessage: '',
      poster: true,
      abstract: {
        create: {
          title: 'Artificial Intelligence in Ecology',
          additionalAuthors: 'L. Johnson',
          affiliationAuthors: 'Center for AI Research',
          abstract:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      },
    },
    {
      fullName: 'Gregory Johnston',
      email: `gregoryjohnston-${demoUserId}@lorem.ipsum`,
      affiliation: 'Department of Et',
      participation: Participation.ONSITE,
      mailingAddress: 'gregoryjohnston@lorem.ipsum',
      student: true,
      additionalMessage: '',
      poster: false,
      invited: true,
      abstract: {
        create: {
          title: 'Space Habitat Designs',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
      },
    },
    {
      fullName: 'Christopher Pollard',
      email: `christopherpollard-${demoUserId}@lorem.ipsum`,
      affiliation: 'Department of Adipiscing',
      participation: Participation.ONSITE,
      mailingAddress: 'christopherpollard@lorem.ipsum',
      student: true,
      additionalMessage: '',
      poster: false,
      invited: true,
      abstract: {
        create: {
          title: 'Cryptographic Techniques for Secure Communication',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit.',
        },
      },
    },
    {
      fullName: 'Jeremy West',
      email: `jeremywest-${demoUserId}@lorem.ipsum`,
      affiliation: 'Department of Culpa',
      participation: Participation.ONLINE,
      mailingAddress: 'jeremywest@lorem.ipsum',
      student: false,
      additionalMessage: 'I look forward to meeting you all!',
      poster: true,
      abstract: {
        create: {
          title: 'Renewable Energy Systems',
          additionalAuthors: 'E. Brown',
          affiliationAuthors: 'Department of Quantum Computing',
          abstract:
            'Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi. Morbi auctor lorem non justo.',
        },
      },
    },
    {
      fullName: 'Jacob Boyer',
      email: `jacobboyer-${demoUserId}@lorem.ipsum`,
      affiliation: 'Department of Commondo',
      participation: Participation.ONLINE,
      mailingAddress: '123 Main Street',
      student: true,
      additionalMessage: '',
      poster: true,
      abstract: {
        create: {
          title: 'Gene Editing and CRISPR Technology',
          additionalAuthors: 'Jane Smith',
          affiliationAuthors: 'XYZ Corp',
          abstract:
            'Aliquam sit amet felis. Mauris semper, velit semper laoreet dictum, quam diam dictum urna.',
        },
      },
    },
    {
      fullName: 'Caleb Wallace',
      email: `calebwallace-${demoUserId}@lorem.ipsum`,
      affiliation: 'University of Quis',
      participation: Participation.ONSITE,
      mailingAddress: '456 Elm Street',
      student: false,
      additionalMessage:
        'Please let me know if there are any travel restrictions for the conference.',
      poster: false,
      abstract: {
        create: {
          title: 'Virtual Reality Learning Environments',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'Nec risus turpis, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.',
        },
      },
    },
    {
      fullName: 'Vanessa Hernandez',
      email: `vanessahernandez-${demoUserId}@lorem.ipsum`,
      affiliation: 'University of Dolor',
      participation: Participation.ONSITE,
      mailingAddress: '789 Oak Street',
      student: true,
      additionalMessage: '',
      poster: true,
      abstract: {
        create: {
          title: 'Autonomous Vehicle Navigation',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.',
        },
      },
    },
    {
      fullName: 'Michael Bauer',
      email: `michaelbauer-${demoUserId}@lorem.ipsum`,
      affiliation: 'Duis Corporation',
      participation: Participation.ONLINE,
      mailingAddress: '101 Main Street',
      student: false,
      additionalMessage: 'Looking forward to the conference!',
      poster: false,
      abstract: {
        create: {
          title: 'Blockchain and Financial Technologies',
          additionalAuthors: 'Mary Johnson',
          affiliationAuthors: 'Cybersecurity Institute',
          abstract:
            'Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor.',
        },
      },
    },
    {
      fullName: 'Marie Fletcher',
      email: `mariefletcher-${demoUserId}@lorem.ipsum`,
      affiliation: 'Magna',
      participation: Participation.ONLINE,
      mailingAddress: 'mariefletcher@lorem.ipsum',
      student: false,
      additionalMessage: '',
      poster: false,
      abstract: {
        create: {
          title: 'Robotics in Healthcare',
          additionalAuthors: 'M. Smith',
          affiliationAuthors: 'Department of Quantum Computing',
          abstract:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      },
    },
    {
      fullName: 'Jacob Werner',
      email: `jacobwerner-${demoUserId}@lorem.ipsum`,
      affiliation: 'Eiusmod in Veniam',
      participation: Participation.ONSITE,
      mailingAddress: 'jacobwerner@lorem.ipsum',
      student: true,
      additionalMessage: 'Excited to present my work at the conference!',
      poster: false,
      abstract: {
        create: {
          title: 'Sustainable Urban Planning',
          additionalAuthors: 'J. Doe',
          affiliationAuthors: 'Institute of Nanotechnology',
          abstract:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      },
    },
    {
      fullName: 'Megan Porter',
      email: `meganporter-${demoUserId}@lorem.ipsum`,
      affiliation: 'Eiusmod in Veniam',
      participation: Participation.ONLINE,
      mailingAddress: 'meganporter@lorem.ipsum',
      student: true,
      additionalMessage: 'Looking forward to the conference!',
      poster: true,
    },
    {
      fullName: 'Jonathan Wilson',
      email: `jonathanwilson-${demoUserId}@lorem.ipsum`,
      affiliation: 'Department of Sit',
      participation: Participation.ONLINE,
      mailingAddress: '159 Nathaniel Views Apt. 318, West Joshua, WA 45046',
      student: true,
      additionalMessage: '',
      poster: false,
    },
    {
      fullName: 'James Buchanan',
      email: `jamesbuchanan-${demoUserId}@lorem.ipsum`,
      affiliation: 'Faculty of Amet',
      participation: Participation.ONSITE,
      mailingAddress: '',
      student: true,
      additionalMessage: '',
      poster: true,
    },
  ];

  const requests = participants.map((participant) => {
    return prisma.participant.create({
      data: {
        ...participant,
        adminId: demoUserId,
      },
    });
  });
  await prisma.$transaction(requests);
}

async function createProgramme(demoUserId?: string) {
  // fetch participants
  const participantsAndAbstracts = await prisma.participant.findMany({
    where: { adminId: demoUserId },
    include: { abstract: true },
  });

  const programme = await prisma.programme.create({
    data: {
      id: `programme-${demoUserId}`,
      conferenceStart: '2050-06-30T22:00:00.000Z',
      adminId: demoUserId,
    },
  });

  const firstProgrammeDay = await prisma.programmeDay.create({
    data: {
      date: '2050-06-30T22:00:00.000Z',
      additionalInfo: '<h4>The first day</h4>',
      start: '2024-03-12T07:00:00.000Z',
      end: '2024-03-12T09:00:00.000Z',
      programmeId: programme.id,
    },
  });
  const secondProgrammeDay = await prisma.programmeDay.create({
    data: {
      date: '2050-07-01T22:00:00.000Z',
      additionalInfo: '<h4>The second day</h4>',
      start: '2024-03-12T07:45:00.000Z',
      end: '2024-03-12T08:15:00.000Z',
      programmeId: programme.id,
    },
  });

  const programmeDayItems = [
    {
      title: '',
      type: ItemType.CHAIRMAN,
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Jonathan Wilson',
      )?.id,
      abstractId: '',
      duration: 0,
      index: 1,
      programmeDayId: firstProgrammeDay.id,
    },
    {
      title: 'Talk',
      type: ItemType.ITEM,
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Michael Mitchell',
      )?.id,
      abstractId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Michael Mitchell',
      )?.abstract?.title, // Artificial Intelligence in Ecology
      duration: 30,
      index: 2,
      programmeDayId: firstProgrammeDay.id,
    },
    {
      title: 'Talk',
      type: ItemType.ITEM,
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Jacob Werner',
      )?.id,
      abstractId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Jacob Werner',
      )?.abstract?.title, // Sustainable Urban Planning
      duration: 30,
      index: 3,
      programmeDayId: firstProgrammeDay.id,
    },
    {
      title: 'Break',
      type: ItemType.ITEM,
      participantId: '',
      abstractId: '',
      duration: 15,
      index: 4,
      programmeDayId: firstProgrammeDay.id,
    },
    {
      title: '',
      type: ItemType.CHAIRMAN,
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Gregory Johnston',
      )?.id,
      abstractId: '',
      duration: 0,
      index: 5,
      programmeDayId: firstProgrammeDay.id,
    },
    {
      title: 'Talk',
      type: ItemType.ITEM,
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Christopher Pollard',
      )?.id,
      abstractId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Christopher Pollard',
      )?.abstract?.title, // Cryptographic Techniques for Secure Communication
      duration: 45,
      index: 6,
      programmeDayId: firstProgrammeDay.id,
    },
    {
      title: '',
      type: ItemType.CHAIRMAN,
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Caleb Wallace',
      )?.id,
      abstractId: '',
      duration: 0,
      index: 1,
      programmeDayId: secondProgrammeDay.id,
    },
    {
      title: 'Talk',
      type: ItemType.ITEM,
      participantId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Vanessa Hernandez',
      )?.id,
      abstractId: participantsAndAbstracts.find(
        (p) => p.fullName === 'Vanessa Hernandez',
      )?.abstract?.title, // Autonomous Vehicle Navigation
      duration: 30,
      index: 2,
      programmeDayId: secondProgrammeDay.id,
    },
  ];

  const itemsRequests = programmeDayItems.map((item) => {
    return prisma.programmeDayItem.create({
      data: {
        ...item,
        adminId: demoUserId,
      },
    });
  });
  await prisma.$transaction(itemsRequests);
}

// Seed the database programmatically
export const seedDemoUser = async (demoUserId: string) => {
  await createPages(demoUserId);
  await createAdmins(demoUserId);
  await createSiteSettings(demoUserId);
  await createParticipantsAndAbstracts(demoUserId);
  await createProgramme(demoUserId);

  console.log(`Demo user ${demoUserId} seeded`);
};
