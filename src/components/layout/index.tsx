import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import classnames from 'classnames';
import styles from './page.module.scss';

interface LayoutProps {
  title?: string;
  navigate?: string;
  className?: string;
  children: React.ReactNode;
}

export function Layout({
  title = '',
  navigate = '',
  className = '',
  children,
}: LayoutProps) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title key="title">
            {title ? `${title}` : 'Equine Register Test'}
          </title>
        </Helmet>
      </HelmetProvider>
      <div className="container">
        <div className="content-header">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">{navigate}</div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <main className={classnames(styles.page, className)}>
                        {children}
                      </main>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
