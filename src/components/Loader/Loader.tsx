import { Oval } from '../../icons';
import styles from './Loader.module.css';

const Loader = () => (
    <div className={styles.overlay} role="status" aria-live="polite" aria-label="Loading">
        <div className={styles.container}>
            <Oval
                height={80}
                width={80}
                color="#24364A"
                secondaryColor="#AAAAAA"
                strokeWidth={5}
                strokeWidthSecondary={5}
            />
            <span className="sr-only">Loading content, please wait...</span>
        </div>
    </div>
);

export default Loader;
