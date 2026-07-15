export const experiences = [
  {
    id: 1,
    role: 'Senior Full Stack Developer',
    company: 'Hamdard University',
    companyLogo: 'https://www.hamdard.edu.pk/wp-content/uploads/2021/12/cropped-header_logo-32x32.png', // یا SVG/JSX component
    companyUrl: 'https://www.hamdard.edu.pk/',
    period: 'May 2024 — Present',
    current: true,
    location: 'Karachi, Pakistan', // optional
    employmentType: 'Full-time', // optional
    points: [
      'Built nationwide Q-Bank system (Laravel + React.js) serving 500+ users across multiple campuses, with exam generation and analytics dashboards',
      'Developed ERP modules (HR, Payroll, Finance) using Laravel and React.js, improving operational efficiency by 40% by automating previously manual workflows',
      'Designed Role-Based Access Control (RBAC) architecture supporting 100+ granular roles with JWT-based authentication, reducing unauthorized access incidents',
      'Optimized database queries and API response times, reducing average page load time by 35%',
    ],
    tags: ['Laravel', 'React.js', 'MySQL', 'JWT', 'RBAC', 'ERP'],
    achievements: [ // optional: key achievements with metrics
      '500+ active users',
      '40% efficiency improvement',
      '35% faster page load',
    ],
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Kdys Lab',
    companyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlfwpNVtgnOfOiuntBqMpDViThDRlH9pnfJhYdzcT8-g&s=10',
    companyUrl: 'https://kdyslab.com/', 
    period: 'Aug 2023 — May 2024',
    current: false,
    location: 'Karachi, Pakistan',
    employmentType: 'Full-time',
    points: [
      'Built scalable eCommerce and CRM systems handling 1,000+ daily transactions with real-time reporting dashboards',
      'Developed and documented REST APIs; integrated Stripe and PayPal payment gateways, reducing checkout and reconciliation friction',
      'Implemented background job queues in Node.js, improving system throughput by 30% under peak load',
      'Built Node.js backend services with asynchronous task handling for API-heavy operations',
    ],
    tags: ['Laravel', 'React.js', 'Node.js', 'Stripe', 'PayPal', 'MongoDB'],
    achievements: [
      '1,000+ daily transactions',
      '30% throughput improvement',
    ],
  },
  {
    id: 3,
    role: 'PHP Laravel Developer',
    company: 'Midline Presence',
    companyLogo: 'https://media.licdn.com/dms/image/v2/D4E0BAQGEyJe7L-nlog/company-logo_200_200/B4EZa05kOPGcAI-/0/1746791714135/midsonline_logo?e=1785369600&v=beta&t=K-oxZfoPOFV4BGkowyS7etMqKVMJVBywL1HARVBmS6Q',
    companyUrl: 'https://www.linkedin.com/company/midsonline/posts/?feedView=all', // فرض کیا
    period: 'Apr 2022 — Aug 2023',
    current: false,
    location: 'Karachi, Pakistan',
    employmentType: 'Full-time',
    points: [
      'Built and maintained REST APIs consumed by web and mobile clients, ensuring consistent data contracts across platforms',
      'Managed AWS infrastructure (EC2, S3, RDS) deployments, improving deployment reliability',
      'Optimized complex SQL queries, improving reporting speed by 25%',
    ],
    tags: ['Laravel', 'PHP', 'AWS', 'MySQL', 'REST API', 'EC2', 'S3', 'RDS'],
    achievements: [
      '25% faster reporting',
    ],
  },
  {
    id: 4,
    role: 'Junior Laravel Developer',
    company: 'DivsnPixel',
    companyLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAWlBMVEXtHCTtHCTtFiLtASTtDyDvLi3klGL7qg76nhT5khDxTSDsAAjwR0z////huZL8ugr/ww3/xwzyZ2r1lJb0bBf83d7+wA75wcXycXf3rrDz7fDv0dXru1DqwVRUS94FAAAAAXRSTlOQsOlLIgAAAQZJREFUeAGU00WSxTAMBNBYskMKM97/mvM7zFXTWz2zZVnqM6h/5/+AmFnTO9DGdlzPZ3oBEoRRnCSpY/QjkCwEQHz9ACQPN5AaugEKQgAnSSEcfgG5cAGR+nQCJCILUJNIPT4CUXkZIgCKq20N67C9A3AuQOrwDOITwPgTYP+8BzJzqayRhtlPzqeQFuXOiBQe4qQAMasNdABGK3anUnqYYAao16J+IFmTFqxWQAqgPYI09lE/zdBvoIrd4vwfpIQIZAYVvtTxR23XkIl4E7j/SQrn9AOWeADSzKAbfxP4dAPbIt2QxkY/fnvJOoDR0fTSF1qauuxtrP8MQET4b+RlPcqyNwMAiQsXeQpdHj0AAAAASUVORK5CYII=',
    companyUrl: 'https://divsnpixel.com', // فرض کیا
    period: 'Oct 2021 — Apr 2022',
    current: false,
    location: 'Karachi, Pakistan',
    employmentType: 'Full-time',
    points: [
      'Developed backend modules and REST APIs for client-facing applications',
      'Built CodeIgniter-based REST API modules (product/category management, authentication) alongside Laravel projects',
      'Implemented role-based access control for a student CRM system (CodeIgniter), covering enrollment, fee, and counselor-assignment workflows',
    ],
    tags: ['Laravel', 'PHP', 'CodeIgniter', 'MySQL', 'RBAC', 'Git'],
  },
  {
    id: 5,
    role: 'Intern / Junior Developer',
    company: 'Connect Marketing Communication (Pvt.) Limited',
    companyLogo: 'https://connectcmc.com/wp-content/uploads/2026/06/logo_black.png',
    companyUrl: 'https://connectcmc.com/', // فرض کیا
    period: 'Dec 2019 — Sep 2021',
    current: false,
    location: 'Karachi, Pakistan',
    employmentType: 'Full-time',
    points: [
      'Promoted from Intern to Junior Developer based on performance',
      'Built and maintained web applications using PHP and Laravel',
      'Built responsive front-end pages using HTML, CSS, and JavaScript',
      'Collaborated with the marketing team to deliver client websites and landing pages',
    ],
    tags: ['PHP', 'Laravel', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    achievements: [
      'Promoted from Intern to Junior Developer',
    ],
  },
]