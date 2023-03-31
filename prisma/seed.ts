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
        '<h3>Characteristics</h3><p>The scientific colloquium of CTU organized by the departments of Software Engineering and Mathematics, FNSPE CTU in Prague is devoted to the meeting of students and young applied mathematicians dealing with numerical solution of partial differential equations, mathematical modelling, numerical simulation of problems in technology, environment, biology and computer science.</p><h4>Organizers</h4><p><strong>J. Kukal</strong>, Department of Software Engineering, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><p>kukal (at) dc.fjfi.cvut.cz</p><p><strong>R. Fučík</strong>, Department of Mathematics, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><p>radek.fucik (at) fjfi.cvut.cz</p><p><strong>P. Pauš</strong>, Department of Mathematics, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><p>petr.paus (at) fjfi.cvut.cz</p><p><strong>M. Beneš</strong>, Department of Mathematics, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><p>michal.benes (at) fjfi.cvut.cz</p><p><strong>M. Kolář</strong>, Department of Mathematics, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><p>miroslav.kolar (at) fjfi.cvut.cz</p><h4>Conference office</h4><p>I. Kukalová, Department of Mathematics, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><h4>Organizing committee</h4><p><strong>J. Kukal, T. Oberhuber, J. Mikyška, R. Fučík, P. Pauš, P. Strachota, P. Eichler</strong></p><h4>Registration</h4><p>Conference fee: <strong>3000 CZK for onsite participation, 0 CZK for online participation</strong><br>Submit your registration via registration form: <a href="register" rel="noopener noreferrer nofollow">Registration form</a><br>Deadline: <strong>May 10, 2022</strong></p><p>Required registration data:</p><ol><li><p>Name</p></li><li><p>Your contact address and e-mail</p></li><li><p>Affiliation</p></li><li><p>The abstract of your contribution</p></li><li><p>Onsite/online attendance</p></li><li><p>Arrival and departure dates</p></li></ol><p></p><h4>Additional information</h4><p><strong>URL:</strong> <a href="http://mmg.fjfi.cvut.cz/wsc-2022" rel="noopener noreferrer nofollow">http://mmg.fjfi.cvut.cz/wsc-2022</a></p><p><strong>Conference poster:</strong> <a href="https://geraldine.fjfi.cvut.cz/wsc2022/poster/wsc2022.pdf" rel="noopener noreferrer nofollow">WSC 2022 Poster</a></p><p><strong>List of </strong><a href="participants" rel="noopener noreferrer nofollow">participants</a></p><p><strong>List of</strong> <a href="abstracts" rel="noopener noreferrer nofollow">abstracts</a></p><p><strong>Information desk:</strong> petr.paus (at) fjfi.cvut.cz</p><p><strong>Venue:</strong><br>Faculty of Nuclear Sciences and Physical Engineering,<br>Pohraniční 1288/1, 405 02 Děčín<br>and MS Teams online</p><p></p><h4>Acknowledgement</h4><p>This event is supported by the project of the Student Grant Agency of the Czech Technical University in Prague No. SVK 42/22/F4</p>',
    },
  });
  await prisma.page.upsert({
    where: { name: 'register' },
    update: {},
    create: {
      name: 'register',
      title: 'Register',
      content:
        '<h3>Registration</h3><p><strong>Deadline:</strong> May 10, 2022<br><strong>Conference fee:</strong> 3000 CZK for onsite participation, 0 CZK for online participation</p><p></p><p><strong>Registration data:</strong></p><ol><li><p>Name</p></li><li><p>Your contact address and e-mail</p></li><li><p>Affiliation</p></li><li><p>The abstract of your contribution</p></li><li><p>Onsite/Online attendance</p></li><li><p>Arrival and departure dates</p></li></ol>',
    },
  });
  await prisma.page.upsert({
    where: { name: 'participants' },
    update: {},
    create: {
      name: 'participants',
      title: 'Participants & Abstracts',
      content: '<h3>Participants and abstracts</h3>',
    },
  });
  await prisma.page.upsert({
    where: { name: 'programme' },
    update: {},
    create: {
      name: 'programme',
      title: 'Programme',
      content:
        '<h3>Scientific programme</h3><h4>Conference venue:</h4><p>The conference venue: <strong>the main building of CTU at Pohraniční street, 1288/1</strong><br>or<br><strong>Online:</strong> MS Teams</p><h4>Registration for local participants</h4><p>Registration for local participants takes place at the conference venue (the main building of CTU at Pohraniční street, 1288/1):<br><strong>Thursday</strong>: from 13:00 to 13:50<br><strong>Friday: </strong>from 8:30 to 9:00 (and during coffee breaks between the sessions)</p><h4>Invited talks</h4><p>Invited oral presentation duration is 30 min = 25 min talk + 5 min for discussion.</p><h4>Regular talks</h4><p>Oral presentation duration is 20 min = max 15 min talk + 5 min for discussion.</p>',
    },
  });
  await prisma.page.upsert({
    where: { name: 'travel' },
    update: {},
    create: {
      name: 'travel',
      title: 'Travel',
      content:
        '<h4>Recommended train:</h4><p>EC 174 Berliner, 10:25 from Praha hlavní nádraží. Or EC&nbsp;378 Berliner, 12:25.</p><h4>From Děčín station to the venue:</h4><p><strong>By bus</strong></p><p>By bus no. <strong>201</strong>, <strong>204</strong>, <strong>209 </strong>to <strong>Myslbekova </strong>station (4th stop).<br>The ticket is 20 CZK, paid in the bus.<br>Please prepare the exact change.<br>Only the front door can be used to enter the bus.</p><p><strong>By walk</strong></p><p>About 1.7 km</p><ol><li><p>Head north on Čs. mládeže toward P. Holého  (0.3 km)</p></li><li><p>Continue onto Na Skřivance  (0.2 km)</p></li><li><p>At the roundabout, turn right onto Labské nábř.  (0.4 km)</p></li><li><p>Slight left to stay on Labské nábř. (0.2 km)</p></li><li><p>Turn right at Tyršova (0.5 km)</p></li><li><p>Take the 2nd right onto Masarykovo nám. (60 m)</p></li><li><p>Continue straight onto Lázeňská (0.2 km)</p></li><li><p>Turn right at Zámecké nám.  (60 m)</p></li><li><p>Slight right at Nároží</p></li></ol><p>Destination will be on the left  </p>',
    },
  });
  await prisma.page.upsert({
    where: { name: 'trip' },
    update: {},
    create: {
      name: 'trip',
      title: 'Trip',
      content:
        '<h3>Trip to České Středohoří (Central Bohemian Highlands)</h3><p>Common departure:<br>10:40 by Bus 512437 205 from Myslbekova bus stop near CTU building (39 CZK)</p>',
    },
  });
  await prisma.page.upsert({
    where: { name: 'gallery' },
    update: {},
    create: {
      name: 'gallery',
      title: 'Gallery',
      content: '<h3>Gallery</h3>',
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
      email: 'admin@wsc.com',
      password: await hashPwd('123456'),
    },
  });
  await prisma.admin.upsert({
    where: { username: 'uTRuside' },
    update: {},
    create: {
      username: 'uTRuside',
      email: 'uTRuside@wsc.com',
      password: await hashPwd('123456'),
    },
  });
  await prisma.admin.upsert({
    where: { username: 'EANdoteo' },
    update: {},
    create: {
      username: 'EANdoteo',
      email: 'EANdoteo@wsc.com',
      password: await hashPwd('123456'),
    },
  });
  await prisma.admin.upsert({
    where: { username: 'NdcHrenT' },
    update: {},
    create: {
      username: 'NdcHrenT',
      email: 'NdcHrenT@wsc.com',
      password: await hashPwd('123456'),
    },
  });
  await prisma.admin.upsert({
    where: { username: 'yElItupl' },
    update: {},
    create: {
      username: 'yElItupl',
      email: 'yElItupl@wsc.com',
      password: await hashPwd('123456'),
    },
  });
  await prisma.admin.upsert({
    where: { username: 'sTERAdbu' },
    update: {},
    create: {
      username: 'sTERAdbu',
      email: 'sTERAdbu@wsc.com',
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
      value: 'Student workshop on scientific computing 2022',
      order: 1,
    },
  });
  await prisma.siteSettings.upsert({
    where: { option: 'date' },
    update: {},
    create: {
      option: 'date',
      value: 'May 26 - 29, 2022.',
      order: 2,
    },
  });
  await prisma.siteSettings.upsert({
    where: { option: 'location' },
    update: {},
    create: {
      option: 'location',
      value: 'Děčín, Czech Republic + online',
      order: 3,
    },
  });
  await prisma.siteSettings.upsert({
    where: { option: 'address department' },
    update: {},
    create: {
      option: 'address department',
      value: 'Departments of Software Engineering and Mathematics',
      order: 4,
    },
  });
  await prisma.siteSettings.upsert({
    where: { option: 'address faculty' },
    update: {},
    create: {
      option: 'address faculty',
      value: 'FNSPE CTU in Prague, Czech Republic',
      order: 5,
    },
  });

  console.log('Site settings created');
}

async function createParticipantsAndAbstracts() {
  await prisma.participant.upsert({
    where: { email: 'kellynguyen@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Kelly Nguyen',
      email: 'kellynguyen@fjfi.cvut.cz',
      affiliation: 'Department of Computer Science',
      participation: 'ONLINE',
      mailingAddress: 'kellynguyen@fjfi.cvut.cz',
      student: true,
      additionalMessage: 'Looking forward to the conference!',
      abstract: {
        create: {
          title: 'Numerical Methods for Data Analysis',
          additionalAuthors: 'T. Nguyen',
          affiliationAuthors: 'Department of Mathematics',
          abstract:
            'We present novel numerical methods for analyzing large data sets. The methods are based on optimization and machine learning techniques and are effective in extracting useful information from the data.',
        },
      },
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'olivermorgan@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Oliver Morgan',
      email: 'olivermorgan@fjfi.cvut.cz',
      affiliation: 'Faculty of Mechanical Engineering',
      participation: 'ONSITE',
      mailingAddress: 'olivermorgan@fjfi.cvut.cz',
      student: false,
      additionalMessage: 'Excited to meet everyone at the conference!',
      abstract: {
        create: {
          title: 'Computational Fluid Dynamics',
          additionalAuthors: 'A. Smith',
          affiliationAuthors: 'Department of Aerospace Engineering',
          abstract:
            'We present a computational method for simulating fluid flow in complex geometries. The method is based on the finite element method and is efficient in capturing turbulent flow.',
        },
      },
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'adamjones@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Adam Jones',
      email: 'adamjones@fjfi.cvut.cz',
      affiliation: 'Department of Electrical Engineering',
      participation: 'ONLINE',
      mailingAddress: 'adamjones@fjfi.cvut.cz',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Control of Nonlinear Systems',
          additionalAuthors: 'J. Kim',
          affiliationAuthors: 'Department of Mathematics',
          abstract:
            'We present a method for designing controllers for nonlinear systems based on Lyapunov theory. The method is effective in stabilizing systems and can be applied to a wide range of applications.',
        },
      },
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'joshuawong@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Joshua Wong',
      email: 'joshuawong@fjfi.cvut.cz',
      affiliation: 'Department of Civil Engineering',
      participation: 'ONSITE',
      mailingAddress: 'joshuawong@fjfi.cvut.cz',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Numerical Methods for Structural Analysis',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'We present a new method for simulating the behavior of structures subjected to external loads. The method is based on the finite element method and is effective in capturing the nonlinear behavior of materials.',
        },
      },
      poster: false,
      invited: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'nowakad@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Daria Nowakova',
      email: 'nowakad@fjfi.cvut.cz',
      affiliation: 'Department of Mathematics, FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress: 'nowakad@fjfi.cvut.cz',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Numerical Methods for Nonlinear Problems',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'In this contribution, we present the use of numerical methods for solving nonlinear problems in various areas of science and engineering. We discuss the implementation and convergence of various iterative schemes, such as Newton and quasi-Newton methods. We also show some examples of applications and numerical results.',
        },
      },
      poster: false,
      invited: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'kubatm@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Martin Kubát',
      email: 'kubatm@fjfi.cvut.cz',
      affiliation: 'Department of Computer Science, FNSPE CTU in Prague',
      participation: 'ONLINE',
      mailingAddress: 'kubatm@fjfi.cvut.cz',
      student: false,
      additionalMessage: 'I look forward to meeting you all!',
      abstract: {
        create: {
          title: 'Model Reduction Techniques for Large-Scale Systems',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'In this contribution, we present the use of model reduction techniques for reducing the computational complexity of large-scale systems. We discuss the implementation and convergence of various methods, such as Proper Orthogonal Decomposition (POD) and Reduced Basis (RB) methods. We also show some examples of applications and numerical results.',
        },
      },
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'john.doe@example.com' },
    update: { additionalMessage: 'Looking forward to the conference!' },
    create: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      affiliation: 'ABC University',
      participation: 'ONLINE',
      mailingAddress: '123 Main Street',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'A New Method for Image Classification',
          additionalAuthors: 'Jane Smith',
          affiliationAuthors: 'XYZ Corp',
          abstract:
            'We propose a new method for image classification that combines deep learning with traditional machine learning techniques. Our approach achieves state-of-the-art performance on several benchmark datasets.',
        },
      },
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'sara.jones@example.com' },
    update: {},
    create: {
      fullName: 'Sara Jones',
      email: 'sara.jones@example.com',
      affiliation: 'University of XYZ',
      participation: 'ONSITE',
      mailingAddress: '456 Elm Street',
      student: false,
      additionalMessage:
        'Please let me know if there are any travel restrictions for the conference.',
      abstract: {
        create: {
          title: 'The Role of AI in Healthcare',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'Artificial intelligence has the potential to transform healthcare by improving patient outcomes, reducing costs, and increasing efficiency. In this talk, we will explore some of the ways that AI is being used in healthcare and discuss the opportunities and challenges ahead.',
        },
      },
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      affiliation: 'University of ABC',
      participation: 'ONSITE',
      mailingAddress: '789 Oak Street',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'A New Algorithm for Network Analysis',
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'We present a new algorithm for network analysis that is based on the concept of eigenvectors. Our approach is highly scalable and can be applied to large-scale networks with millions of nodes and edges.',
        },
      },
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'john.smith@example.com' },
    update: {},
    create: {
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      affiliation: 'XYZ Corporation',
      participation: 'ONLINE',
      mailingAddress: '101 Main Street',
      student: false,
      additionalMessage: 'Looking forward to the conference!',
      abstract: {
        create: {
          title: 'Building Better Chatbots',
          additionalAuthors: 'Mary Johnson',
          affiliationAuthors: 'ABC Company',
          abstract:
            'Chatbots are becoming an increasingly popular tool for businesses to engage with customers. In this presentation, we will discuss some of the challenges and opportunities in building chatbots that are both effective and engaging.',
        },
      },
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'kratkaa@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Anna Krátká',
      email: 'kratkaa@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONLINE',
      mailingAddress: 'kratkaa@fjfi.cvut.cz',
      student: false,
      additionalMessage: '',
      abstract: {
        create: {
          title:
            'A parallel algorithm for solving the Poisson equation on distributed-memory computers',
          additionalAuthors: 'Lukáš Smékal',
          affiliationAuthors:
            'Department of Software Engineering, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague',
          abstract:
            'We present a parallel algorithm for solving the Poisson equation on distributed-memory computers using the finite difference method. We discuss the performance of our approach and demonstrate some numerical results obtained on a cluster of computers.',
        },
      },
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'havelada@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Adam Havelda',
      email: 'havelada@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress: 'havelada@fjfi.cvut.cz',
      student: true,
      additionalMessage: 'Excited to present my work at the conference!',
      abstract: {
        create: {
          title:
            'Application of finite element method to wave propagation problems',
          additionalAuthors: 'Jan Novák',
          affiliationAuthors:
            'Department of Mathematics, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague',
          abstract:
            'We consider wave propagation problems in a bounded domain in 2D and 3D and present some numerical results obtained by the finite element method. We also discuss some possible applications of our approach in seismology and acoustics.',
        },
      },
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'kochric@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Richard Kochman',
      email: 'kochric@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONLINE',
      mailingAddress: 'kochric@fjfi.cvut.cz',
      student: true,
      additionalMessage: 'Looking forward to the conference!',
      abstract: {
        create: {
          title: 'Numerical solutions of transport phenomena in porous media',
          additionalAuthors: 'Karel Novák, Petra Švábová',
          affiliationAuthors:
            'Faculty of Chemical Technology, University of Chemistry and Technology Prague',
          abstract:
            'We study the transport phenomena in porous media using numerical methods based on the lattice Boltzmann method. We present some numerical results on the diffusion and advection processes in porous media and their dependence on the microstructure.',
        },
      },
      poster: true,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'kubajoh@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Johanka Kubíková',
      email: 'kubajoh@fjfi.cvut.cz',
      affiliation: 'Department of Mathematics, CTU',
      participation: 'ONLINE',
      mailingAddress: 'Karlovo nám. 13, 121 35 Prague 2',
      student: true,
      additionalMessage: '',
      poster: false,
    },
  });
  await prisma.participant.upsert({
    where: { email: 'novavil@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Vilma Nováková',
      email: 'novavil@fjfi.cvut.cz',
      affiliation: 'Faculty of Nuclear Sciences and Physical Engineering, CTU',
      participation: 'ONSITE',
      mailingAddress: 'Břehová 7, 115 19 Prague 1',
      student: true,
      additionalMessage: '',
      poster: true,
    },
  });

  console.log('Created participants and abstracts');
}

async function main() {
  await createPages();
  await createAdmins();
  await createSiteSettings();
  await createParticipantsAndAbstracts();
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
