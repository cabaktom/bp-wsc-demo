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
        '<h3>Characteristics</h3><p>The scientific colloquium of CTU organized by the departments of Software Engineering and Mathematics, FNSPE CTU in Prague is devoted to the meeting of students and young applied mathematicians dealing with numerical solution of partial differential equations, mathematical modelling, numerical simulation of problems in technology, environment, biology and computer science.</p><h4>Organizers</h4><p><strong>J. Kukal</strong>, Department of Software Engineering, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><p><a rel="noopener noreferrer nofollow" href="kukal@dc.fjfi.cvut.cz">kukal (at) </a><a rel="noopener noreferrer nofollow" href="http://dc.fjfi.cvut.cz">dc.fjfi.cvut.cz</a></p><p><strong>R. Fučík</strong>, Department of Mathematics, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><p><a rel="noopener noreferrer nofollow" href="radek.fucik@fjfi.cvut.cz">radek.fucik (at) fjfi.cvut.cz</a></p><p><strong>P. Pauš</strong>, Department of Mathematics, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><p><a rel="noopener noreferrer nofollow" href="petr.paus@fjfi.cvut.cz">petr.paus (at) </a><a rel="noopener noreferrer nofollow" href="http://fjfi.cvut.cz">fjfi.cvut.cz</a></p><p><strong>M. Beneš</strong>, Department of Mathematics, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><p><a rel="noopener noreferrer nofollow" href="michal.benes@fjfi.cvut.cz">michal.benes (at) </a><a rel="noopener noreferrer nofollow" href="http://fjfi.cvut.cz">fjfi.cvut.cz</a></p><p><strong>M. Kolář</strong>, Department of Mathematics, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><p><a rel="noopener noreferrer nofollow" href="miroslav.kolar@fjfi.cvut.cz">miroslav.kolar (at) fjfi.cvut.cz</a></p><h4>Conference office</h4><p>I. Kukalová, Department of Mathematics, Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p><h4>Organizing committee</h4><p><strong>J. Kukal, T. Oberhuber, J. Mikyška, R. Fučík, P. Pauš, P. Strachota, P. Eichler</strong></p><h4>Registration</h4><p>Conference fee: <strong>3000 CZK for onsite participation, 0 CZK for online participation</strong><br>Submit your registration via registration form: <a rel="noopener noreferrer nofollow" href="register">Registration form</a><br>Deadline: <strong>May 10, 2022</strong></p><p>Required registration data:</p><ol><li><p>Name</p></li><li><p>Your contact address and e-mail</p></li><li><p>Affiliation</p></li><li><p>The abstract of your contribution</p></li><li><p>Onsite/online attendance</p></li><li><p>Arrival and departure dates</p></li></ol><p></p><h4>Additional information</h4><p><strong>URL:</strong> <a rel="noopener noreferrer nofollow" href="http://mmg.fjfi.cvut.cz/wsc-2022">http://mmg.fjfi.cvut.cz/wsc-2022</a></p><p><strong>Conference poster:</strong> <a rel="noopener noreferrer nofollow" href="https://geraldine.fjfi.cvut.cz/wsc2022/poster/wsc2022.pdf">WSC 2022 Poster</a></p><p><strong>List of </strong><a rel="noopener noreferrer nofollow" href="participants">participants</a></p><p><strong>List of</strong> <a rel="noopener noreferrer nofollow" href="abstracts">abstracts</a></p><p><strong>Information desk:</strong> <a rel="noopener noreferrer nofollow" href="petr.paus@fjfi.cvut.cz">petr.paus (at) </a><a rel="noopener noreferrer nofollow" href="http://fjfi.cvut.cz">fjfi.cvut.cz</a></p><p><strong>Venue:</strong><br>Faculty of Nuclear Sciences and Physical Engineering,<br>Pohraniční 1288/1, 405 02 Děčín<br>and MS Teams online</p><p></p><h4>Acknowledgement</h4><p>This event is supported by the project of the Student Grant Agency of the Czech Technical University in Prague No. SVK 42/22/F4</p>',
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
    where: { email: 'balazmon@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Monika Balázsová',
      email: 'balazmon@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress: 'balazmon@fjfi.cvut.cz',
      student: false,
      additionalMessage: '',
      abstract: {
        create: {
          title: ' Adjoint method for PDEs',
          poster: false,
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'In a numerical optimization problem the adjoint method allows us to compute the gradient of a functional or operator in an effective and cheap way. In this contribution we demonstrate the adjoint method on the optimization problem for heat equation with a Dirichlet boundary control and show some possible applications and numerical results.',
        },
      },
    },
  });
  await prisma.participant.upsert({
    where: { email: 'michal.benes@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Michal Beneš',
      email: 'michal.benes@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress: 'Břehová 7, Praha 1 FNSPE CTU in Prague',
      student: false,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Modeling Experiments in Freezing and Thawing of Porous Media',
          poster: false,
          additionalAuthors: 'Michal Sněhota, Martina Sobotková',
          affiliationAuthors: 'Faculty of Civil Engineering, CTU in Prague',
          abstract:
            'In the contribution, we discuss the modeling of freezing and thawing in a fully saturated porous medium at the experimental laboratory scale. The phase transition leaves the grains intact but involved in the heat transfer and mechanical interaction due to the difference in specific volumes of the liquid and solid phase. The model based on conservation laws of mass, energy and momentum is used for simulation of particular laboratory experiments.',
        },
      },
    },
  });
  await prisma.participant.upsert({
    where: { email: 'buresj11@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Jan Bureš',
      email: 'buresj11@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress: '',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title:
            'On stress integration method for lattice Boltzmann method in 2D',
          poster: false,
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract: '',
        },
      },
    },
  });
  await prisma.participant.upsert({
    where: { email: 'diasomic@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Michaela Diasová',
      email: 'diasomic@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress: 'Trojanova 13, Praha 2',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Iterated Function Systems, Their Invariant Sets and Measure',
          poster: false,
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'This contribution deals with iterated function systems (IFS), its invariant sets and the chaos game algorithm, which is used to display them. In order to analyze these sets some properties of the inductive, Hausdorff, similarity and box-counting dimension are shown. Subsequently, the changes inside invariant sets caused by recurrent IFS are studied. The aproximation of the box-counting dimension for some of these sets is introduced.',
        },
      },
    },
  });
  await prisma.participant.upsert({
    where: { email: 'eichlpa1@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Pavel Eichler',
      email: 'eichlpa1@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress: 'eichlpa1@fjfi.cvut.cz',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title: 'Lattice Boltzmann method and Boundary conditions',
          poster: false,
          additionalAuthors: '',
          affiliationAuthors: 'FNSPE CTU in Prague',
          abstract:
            'Classical problems for the incompressible fluid flow simulations are given in the macroscopic description, i.e., using the initial and boundary conditions for the fluid velocity and pressure. In the case of the mesoscopic simulations, the macroscopic conditions must be transferred to the mesoscopic description. The commonly used way is based on the setting of the discrete density function to its equilibrium part. This method neglects the non-equilibrium part and is correct only for cases with constant pressure and velocity in space and time.\n\nIn this contribution, the other commonly used approximations of the boundary conditions are discussed and analyzed on the 3D periodic fluid flow between parallel plates. Finally, the newly derived momentum boundary conditions for the D3Q27 are introduced and tested. These boundary conditions present a more accurate alternative to the other mesoscopic boundary conditions.',
        },
      },
    },
  });
  await prisma.participant.upsert({
    where: { email: 'fucik@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Radek Fučík',
      email: 'fucik@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress: '',
      student: false,
      additionalMessage: '',
      abstract: {
        create: {
          title:
            'Equivalent partial differential equation of the lattice Boltzmann method',
          poster: false,
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'A general method for the derivation of equivalent finite difference equations (EFDEs) and subsequent equivalent partial differential equations (EPDEs) presented for a general matrix lattice Boltzmann method (LBM). The method can be used for both the advection diffusion equations and Navier-Stokes equations in all dimensions. In principle, the EFDEs are derived using a recurrence formula. A computational algorithm is proposed for generating sequences of matrices and vectors that are used to obtain EFDEs coefficients. The resulting EFDEs and EPDEs are derived for selected velocity models and include the single relaxation time, multiple relaxation time, and cascaded LBM collision operators. The algorithm for the derivation of EFDEs and EPDEs is implemented in C++ using the GiNaC library for symbolic algebraic computations. Its iplementation is available under the terms and conditions of the GNU general public license (GPL).',
        },
      },
    },
  });
  await prisma.participant.upsert({
    where: { email: 'vladimir.fuka@mff.cuni.cz' },
    update: {},
    create: {
      fullName: 'Vladimír Fuka',
      email: 'vladimir.fuka@mff.cuni.cz',
      affiliation: 'Faculty of Mathematics and Physics, Charles University',
      participation: 'ONSITE',
      mailingAddress:
        'Univerzita Karlova, Matematicko-fyzikální fakulta Ke Karlovu 3, 121 16 Praha 2 IČ: 00216208, DIČ: CZ00216208 ',
      student: false,
      additionalMessage:
        'I can only stay until Friday early afternoon due to travel for an important family celebration.',
      abstract: {
        create: {
          title: 'LES and DNS of flow and scal dispersion in a street canyon',
          poster: false,
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract:
            'In previous large eddy simulations (LES) and wind-tunnel measurements of several street-network configurations it was found that one particular configuration of building shapes poses a particular challenge to the numerical model and even the mean flow in the street canyon differs considerably between the measurement and the simulation.\n\n\nTo be able to conduct simulation for the analysis of the role of the coherent structures for the street canyon ventilation we need to be able to simulate this flow confidently. Therefore, a series of simulations that test the sensitivity of the LES simulations to various setup parameters were performed. Additionally, also direct numerical simulations were performed in a small domain with a reduced Reynolds number (while remaining fully turbulent). The parameters tested are the size of the domain - in particular when interested about persistent large scale structures and convergence of the flow towards a homogeneous mean, the subgrid model, the order of the finite difference approximation and lateral boundary conditions.',
        },
      },
    },
  });
  await prisma.participant.upsert({
    where: { email: 'rholub@clarkson.edu' },
    update: {},
    create: {
      fullName: 'Robert F. Holub',
      email: 'rholub@clarkson.edu',
      affiliation: 'Clarkson University, Potsdam, New York, U.S.A',
      participation: 'ONLINE',
      mailingAddress: '',
      student: false,
      additionalMessage: 'Clarkson University, Potsdam, New York, U.S.A',
    },
  });
  await prisma.participant.upsert({
    where: { email: 'Dombas1999@gmail.com' },
    update: {},
    create: {
      fullName: 'Dominik Horák',
      email: 'Dombas1999@gmail.com',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress: '',
      student: true,
      additionalMessage: '',
      abstract: {
        create: {
          title:
            'Mathematical modeling of flow around obstacles using the lattice Boltzmann method',
          poster: false,
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract: '',
        },
      },
    },
  });
  await prisma.participant.upsert({
    where: { email: 'mail@mail.mai' },
    update: {},
    create: {
      fullName: 'Ladislav Kalvoda',
      email: 'mail@mail.mai',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONLINE',
      mailingAddress: '',
      student: false,
      additionalMessage: 'Jen pasivni ucast online',
    },
  });
  await prisma.participant.upsert({
    where: { email: 'klinkjak@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Jakub Klinkovský',
      email: 'klinkjak@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress: 'Trojanova 13, 120 00 Praha 2',
      student: true,
      additionalMessage:
        'odjezd dříve - 29.6. v 16:35 odlet do Abu Dhabi (interpore)',
      abstract: {
        create: {
          title: 'Modeling vapor transport in air using LBM and MHFEM',
          poster: false,
          additionalAuthors:
            'Andrew C. Trautz, Radek Fučík, Tissa H. Illangasekare',
          affiliationAuthors:
            'USACE ERDC in Vicksburg, FNSPE CTU in Prague, CSM in Golden',
          abstract:
            'We present an efficient computational approach for simulating component transport within single-phase free flow in the boundary layer over porous media. A numerical model based on this approach is validated using experimental data generated in a climate-controlled wind tunnel coupled with a 7.3 m long soil test bed. The developed modeling approach is based on a combination of the lattice Boltzmann method (LBM) for simulating the fluid flow and the mixed-hybrid finite element method (MHFEM) for solving constituent transport. Both those methods individually, as well as when coupled, are implemented entirely on a GPU accelerator in order to utilize its computational power and avoid the hardware limitations caused by slow communication between the GPU and CPU over the PCI-E bus. We describe the mathematical details behind the computational method, focusing primarily on the coupling mechanisms. The performance of the solver is demonstrated on a modern high-performance computing system. Flow and transport simulation results are validated and compared herein with experimental velocity and relative humidity measurements made above a flat partially saturated soil layer exposed to steady air flow. Model robustness and flexibility is demonstrated by introducing rectangular bluff-bodies to the flow in several different experimental scenarios.',
        },
      },
    },
  });
  await prisma.participant.upsert({
    where: { email: 'kolarmir@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Miroslav Kolář',
      email: 'kolarmir@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress: 'Trojanova 13 12000 Praha 2',
      student: false,
      additionalMessage: '',
    },
  });
  await prisma.participant.upsert({
    where: { email: 'kukal@fjfi.cvut.cz' },
    update: {},
    create: {
      fullName: 'Jaromir Kukal',
      email: 'kukal@fjfi.cvut.cz',
      affiliation: 'FNSPE CTU in Prague',
      participation: 'ONSITE',
      mailingAddress:
        'FNSPE CTU in Prague, Brehova 7, Prague 1, Czech Republic',
      student: false,
      additionalMessage: '',
      abstract: {
        create: {
          title:
            'Fast Evaluation of Modified Renyi Entropy for Fractal Analysis',
          poster: false,
          additionalAuthors: 'Martin Dlask',
          affiliationAuthors: 'FNSPE CTU in Prague',
          abstract:
            'A fractal dimension is a non-integer characteristic that measures the space filling of an arbitrary set. The conventional grid based methods usually provide a biased estimation of the fractal dimension, and therefore it is necessary to develop more complex methods for its estimation. A new characteristic based on the Parzen estimate formula is presented here as the modified Renyi entropy. A novel approach that employs the log-linear dependence of a modified Renyi entropy is used together with very fast implementation of epsilon search in k-d tree.',
        },
      },
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
