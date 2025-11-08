import React from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
    header: React.ReactNode;
    children: React.ReactNode;
}

function Layout({ header, children }: LayoutProps) {
    return (
        <>
            <header className={styles.header}>{header}</header>
            <main className={styles.main}>{children}</main>
        </>
    );
}

export default Layout;
