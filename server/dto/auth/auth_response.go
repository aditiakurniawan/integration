package authdto

type LoginResponse struct {
	Email string `gorm:"type: varchar(255)" json:"email" from:"email" `
	Token string `gorm:"type: varchar(255)" json:"token" `
}

type RegisterResponse struct {
	Email string `gorm:"type: varchar(255)" json:"email" `
	Token string `gorm:"type: varchar(255)" json:"Token" `
}

type CheckAuthResponse struct {
	Id       int    `gorm:"type: int" json:"id"`
	FullName string `gorm:"type: varchar(255)" json:"Fullname"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Status   string `gorm:"type: varchar(50)"  json:"status"`
}
