import React from 'react'
import styles from './ConfirmationDialog.module.css'

function ConfirmationDialog({confirmAction, selectedStatus='', handleCancelAssign, handleConfirm}) {
  return (
    <div className={styles.confirmDialog}>
          <span>
            {confirmAction === "assign"
              ? "Chat would be assigned to a different team member"
              : `Ticket status will be updated to ${selectedStatus}`}
          </span>
          <div className={styles.buttons}>
            <button
              className={styles.cancelButton}
              onClick={handleCancelAssign}
            >
              Cancel
            </button>
            <button className={styles.confirmButton} onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
  )
}

export default ConfirmationDialog