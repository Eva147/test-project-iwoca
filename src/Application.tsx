import React from "react";
import { AppType } from "./types/application.type";
import styles from "./Application.module.css";

type ApplicationProps = {
  application: AppType;
};

const Application = ({ application }: ApplicationProps) => {
  const formatCurrency = (amount: number): string => {
    return `£${amount.toLocaleString("en-GB")}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className={styles.application}>
      <div className={styles.header}>
        <img src={application.avatar} alt="Avatar" className={styles.avatar} />
        <div className={styles.nameSection}>
          <h3 className={styles.name}>
            {application.first_name} {application.last_name}
          </h3>
          <p className={styles.email}>{application.email}</p>
        </div>
      </div>
      
      <div className={styles.details}>
        <div className={styles.field}>
          <span className={styles.label}>Company</span>
          <span className={styles.value}>{application.company}</span>
        </div>
        
        <div className={styles.field}>
          <span className={styles.label}>Loan Amount</span>
          <span className={styles.value}>{formatCurrency(application.loan_amount)}</span>
        </div>
        
        <div className={styles.field}>
          <span className={styles.label}>Application Date</span>
          <span className={styles.value}>{formatDate(application.date_created)}</span>
        </div>
        
        <div className={styles.field}>
          <span className={styles.label}>Expiry Date</span>
          <span className={styles.value}>{formatDate(application.expiry_date)}</span>
        </div>
      </div>

      {application.loan_history && application.loan_history.length > 0 && (
        <div className={styles.loanHistory}>
          <h4 className={styles.historyTitle}>Loan History</h4>
          {application.loan_history.map((loan, index) => (
            <div key={index} className={styles.historyItem}>
              <span>£{loan.principle.toLocaleString("en-GB")} at {loan.interest_rate}%</span>
              <span>{formatDate(loan.loan_started)} - {formatDate(loan.loan_ended)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Application;