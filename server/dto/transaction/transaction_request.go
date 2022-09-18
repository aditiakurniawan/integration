package transactiondto

// import "time"

type TransactionRequest struct {
	ID        int    `json:"id" gorm:"primary_key:auto_increment"`
	StartDate string `json:"startdate" form:"startdate" gorm:"type: varchar(255)"`
	DueDate   string `json:"duedate" form:"duedate" gorm:"type: varchar(255)"`
	UserId    int    `json:"user_id" form:"user_id"`
	Attache   string `json:"attach" form:"thumbnailFilm" gorm:"type: varchar(255)"`
	Status    string `json:"status" form:"status" gorm:"type: varchar(255)"`
}
