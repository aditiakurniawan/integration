package transactiondto

// import "time"

type TransactionResponse struct {
	ID        int    `json:"id"`
	StartDate string `json:"startdate" gorm:"type: varchar(255)"`
	DueDate   string `json:"duedate" gorm:"type: varchar(255)"`
	UserId    int    `json:"user_id"`
	Attache   string `json:"attach" gorm:"type: varchar(255)"`
	Status    string `json:"status" gorm:"type: varchar(255)"`
}
