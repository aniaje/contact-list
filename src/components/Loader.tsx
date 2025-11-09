import { Oval } from './Oval';
import styles from './Loader.module.css';

const Loader = () => (
    <div className={styles.overlay}>
        <div className={styles.container}>
            <div className={styles.spinner}>
                <Oval
                    height={80}
                    width={80}
                    color="#24364A"
                    secondaryColor="#AAAAAA"
                    strokeWidth={5}
                    strokeWidthSecondary={5}
                />
            </div>
        </div>
    </div>
);

export default Loader;
