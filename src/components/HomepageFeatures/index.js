import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Ingest ePIs and IPS',
    Svg: require('@site/static/img/cloud-data-download-svgrepo-com.svg').default,
    description: (
      <>
        FOSPS uses HL-7 FHIR to manage ePIs (electronic Product Information) and IPS (International Patient Summary), 
        the future of interoperability. Connect to existing compendia, and health care systems with ease.
      </>
    ),
  },
  {
    title: 'Post process ePIs',
    Svg: require('@site/static/img/annotate-svgrepo-com.svg').default,
    description: (
      <>
        Add personality and personalization to ePIs. Whether is preparing them as your ePrescription/eDispensation applicaiton
        needs, or embedding annotations conainting important information for users, FOSPS automatizes the process.
      </>
    ),
  },
  {
    title: 'Unify ePrescription/eDispensation accross borders',
    Svg: require('@site/static/img/process-svgrepo-com.svg').default,
    description: (
      <>
        Through both data and process standards, smart appliactions can take advantage of personalization and safety accross jurisdictions.
        Have personalization rules that work idependently of the appliactions.
      </>
    ),
  },
  {
    title: 'Focusing Mechanism',
    Svg: require('@site/static/img/lens-svgrepo-com.svg').default,
    description: (
      <>
        This core feature enables the personalization of electronic Product Information (ePI) for end-users. It involves pre-processing ePIs, 
        selecting appropriate lenses based on user context, and applying these lenses to tailor the information presented.
      </>
    ),
  },
  {
    title: 'Supporting Material Management',
    Svg: require('@site/static/img/multiple-documents-files-svgrepo-com.svg').default,
    description: (
      <>
        FOSPS allows the management of supplementary materials (SM), including RMM/aRMM, HEM, and other educational content, to provide a 
        holistic view of medication and health information.
      </>
    ),
  },
  {
    title: 'Cyber Trust Framework (CTF)',
    Svg: require('@site/static/img/trust-wallet-svgrepo-com.svg').default,
    description: (
      <>
        Ensures content trustworthiness through provenance records, data integrity verification, and trust functions, enabling secure exchange of validated.
      </>
    ),
  },
  {
    title: 'Modular Architecture',
    Svg: require('@site/static/img/puzzle-9-svgrepo-com.svg').default,
    description: (
      <>
        FOSPS is designed with a three-layer architecture: Data, Service, and App Layer. This modularity allows for flexibility, scalability, and adaptation 
        to various use cases. 
      </>
    ),
  },
  {
    title: 'Federated Architecture',
    Svg: require('@site/static/img/federated-svgrepo-com.svg').default,
    description: (
      <>
        Allows for the interconnection of multiple FOSPS instances, enabling collaboration and data exchange across different healthcare organizations or regions. 
      </>
    ),
  },
  {
    title: 'Authentication and Authorization',
    Svg: require('@site/static/img/user-check-svgrepo-com.svg').default,
    description: (
      <>
        Employs Keycloak for secure access control, ensuring that users can only access authorized resources based on their roles and permissions. 
      </>
    ),
  },
  {
    title: 'Metrics Management',
    Svg: require('@site/static/img/chart-mixed-svgrepo-com.svg').default,
    description: (
      <>
        Utilizes the Grafana/Loki/Prometheus Stack to monitor and analyze the performance and health of FOSPS services. This allows administrators to track KPIs, identify bottlenecks, and ensure system stability.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
