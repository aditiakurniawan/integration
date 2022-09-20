package authdto

type LoginResponse struct {
	Id        int    `gorm:"type: int" json:"id"`
	FullName  string `gorm:"type: varchar(255)" json:"Fullname"`
	Email     string `gorm:"type: varchar(255)" json:"email"`
	Subscribe string `gorm:"type: varchar(50)"  json:"status"`
	Gender    string `gorm:"type: varchar(50)"  json:"gender"`
	Address   string `gorm:"type: varchar(50)"  json:"address"`
	Phone     string `gorm:"type: varchar(50)"  json:"phone"`
	Role      string `json:"role"`
	Token     string `json:"token"`
}

type RegisterResponse struct {
	Email string `gorm:"type: varchar(255)" json:"email" `
	Token string `gorm:"type: varchar(255)" json:"Token" `
}

type CheckAuthResponse struct {
	Id        int    `gorm:"type: int" json:"id"`
	FullName  string `gorm:"type: varchar(255)" json:"Fullname"`
	Email     string `gorm:"type: varchar(255)" json:"email"`
	Subscribe string `gorm:"type: varchar(50)"  json:"status"`
	Gender    string `gorm:"type: varchar(50)"  json:"gender"`
	Address   string `gorm:"type: varchar(50)"  json:"address"`
	Phone     string `gorm:"type: varchar(50)"  json:"phone"`
	Role      string `json:"role"`
}
