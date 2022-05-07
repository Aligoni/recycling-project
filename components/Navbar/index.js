import { useRouter } from 'next/router';

import styles from './Navbar.module.scss';

export default function Navbar (props) {

    const router = useRouter();

    return (
        <div className={!props.nothome ? styles.top + " flex w-full justify-between" : styles.top + " bg-white py-2 px-3 flex w-full justify-between " + styles.textBlack}>
            <img className="ml-4 mb-2 w-20 h-20 cursor-pointer" src="/logo.png" alt="" onClick={() => router.push('/')}/>
            <div className={`${styles.navtext} flex items-center justify-between`}>
                <p className={`${styles.item}`} onClick={() => router.push('/stats')}>Statistics</p>
                <p className={`${styles.item}`} onClick={() => router.push('/articles')}>Articles</p>
                <p className={`${styles.item}`} onClick={() => router.push('/about')}>About</p>
            </div>
        </div>
    )
}