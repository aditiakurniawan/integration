package transactiondto

// import "time"

type TransactionRequest struct {
	ID        int    `json:"id" gorm:"primary_key:auto_increment"`
	StartDate string `json:"startdate" form:"startdate" gorm:"type: varchar(255)"`
	DueDate   string `json:"duedate" form:"duedate" gorm:"type: varchar(255)"`
	UserID    int    `json:"user_id" form:"userid"`
	Attache   string `json:"attach" form:"thumbnailFilm" gorm:"type: varchar(255)"`
	Status    string `json:"status" form:"status" gorm:"type: varchar(255)"`
	Price     int    `json:"price"`
}

type CreateTransactionRequest struct {
	UserID    int    `json:"price"`
	StartDate string `json:"startdate" form:"startdate"`
	DueDate   string `json:"duedate" form:"duedate"`
	Attache   string `json:"attache" form:"image" `
	Status    string `json:"status" form:"status"`
	// Price     int    `json:"price"`
}

type UpdateTransactionRequest struct {
	UserID    int    `json:"user_id"`
	StartDate string `json:"startdate" form:"startdate"`
	DueDate   string `json:"duedate" form:"duedate"`
	Attache   string `json:"attache" form:"image"`
	Status    string `json:"status" form:"status"`
	Price     int    `json:"price"`
}
