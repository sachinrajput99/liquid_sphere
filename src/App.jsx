import {
  Billing,
  Business,
  Button,
  CTA,
  CardDeal,
  Clients,
  Footer,
  GetStarted,
  Hero,
  Navbar,
  Stats,
  Testimonials,
} from "./component";

import styles from "./style";
import { ConnectButton } from '@rainbow-me/rainbowkit';


function App({children}) {
  return (
    <>
      <div className={`bg-primary w-full overflow-hidden mb-[-25px] `}>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar ConnectButton={children}/>
          </div>
        </div>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth} text-white`}>
            {/* <Stats /> */}
            <Business />
            {/* <Billing /> */}
            <CardDeal />
            {/* <Testimonials />
            <Clients />
            <CTA />

            <Footer /> */}
          </div>
        </div>
      </div>

      {/* <div className="text-green-700 text-5xl">
        
       
      </div> */}
    </>
  );
}

export default App;
