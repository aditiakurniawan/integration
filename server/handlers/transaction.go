package handlers

import (
	dto "dumflix/dto/result"
	transactiondto "dumflix/dto/transaction"

	"dumflix/models"
	"dumflix/repositories"
	"encoding/json"
	"github.com/go-playground/validator/v10"
	// "github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/midtrans/midtrans-go/snap"
	// "gopkg.in/gomail.v2"
	"net/http"
	"os"
	"strconv"
)

var c = coreapi.Client{
	ServerKey: os.Getenv("SERVER_KEY"),
	ClientKey: os.Getenv("CLIENT_KEY"),
}

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}

func (h *handlerTransaction) FindTransactions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: transactions}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) GetTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(transaction)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	// userId := int(userInfo["id"].(float64))

	request := new(transactiondto.TransactionRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// var TransIdIsMatch = false
	// var TransactionId int
	// for !TransIdIsMatch {
	// 	TransactionId = userId + request.SellerId + request.ProductId + rand.Intn(10000) - rand.Intn(100)
	// 	transactionData, _ := h.TransactionRepository.GetTransaction(TransactionId)
	// 	if transactionData.ID == 0 {
	// 		TransIdIsMatch = true
	// 	}
	// }

	transaction := models.Transaction{
		StartDate: request.StartDate,
		DueDate:   request.DueDate,
		UserId:    request.UserId,
		Attache:   request.Attache,
		Status:    request.Status,
	}

	data, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(data)}
	json.NewEncoder(w).Encode(response)

	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// Use to midtrans.Production if you want Production Environment (accept real transaction).

	// 2. Initiate Snap request param
	// req := &snap.Request{
	// 	TransactionDetails: midtrans.TransactionDetails{
	// 		OrderID:  strconv.Itoa(dataTransactions.ID),
	// 		GrossAmt: int64(dataTransactions.Price),
	// 	},
	// 	CreditCard: &snap.CreditCardDetails{
	// 		Secure: true,
	// 	},
	// 	CustomerDetail: &midtrans.CustomerDetails{
	// 		FName: dataTransactions.Buyer.Name,
	// 		Email: dataTransactions.Buyer.Email,
	// 	},
	// }

	// 3. Execute request create Snap transaction to Midtrans Snap API
	// snapResp, _ := s.CreateTransaction(req)

	// w.WriteHeader(http.StatusOK)
	// response := dto.SuccessResult{Code: http.StatusOK, Data: snapResp}
	// json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) UpdateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(transactiondto.TransactionRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	transaction, err := h.TransactionRepository.GetTransaction(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.StartDate != "" {
		transaction.StartDate = request.StartDate
	}

	if request.DueDate != "" {
		transaction.DueDate = request.DueDate
	}

	if request.Attache != "" {
		transaction.Attache = request.Attache
	}

	if request.Status != "" {
		transaction.Status = request.Status
	}

	data, err := h.TransactionRepository.UpdateTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) DeleteTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(data)}
	json.NewEncoder(w).Encode(response)
}
func convertResponseTransaction(u models.Transaction) transactiondto.TransactionResponse {
	return transactiondto.TransactionResponse{
		ID:        u.ID,
		StartDate: u.StartDate,
		DueDate:   u.DueDate,
		UserId:    u.UserId,
		Attache:   u.Attache,
		Status:    u.Status,
	}
}

// func (h *handlerTransaction) Notification(w http.ResponseWriter, r *http.Request) {
// 	var notificationPayload map[string]interface{}

// 	err := json.NewDecoder(r.Body).Decode(&notificationPayload)
// 	if err != nil {
// 		w.WriteHeader(http.StatusBadRequest)
// 		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
// 		json.NewEncoder(w).Encode(response)
// 		return
// 	}

// 	transactionStatus := notificationPayload["transaction_status"].(string)
// 	fraudStatus := notificationPayload["fraud_status"].(string)
// 	orderId := notificationPayload["order_id"].(string)

// 	if transactionStatus == "capture" {
// 		if fraudStatus == "challenge" {
// 			// TODO set transaction status on your database to 'challenge'
// 			// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
// 			h.TransactionRepository.UpdateTransaction("pending", orderId)
// 		} else if fraudStatus == "accept" {
// 			// TODO set transaction status on your database to 'success'
// 			h.TransactionRepository.UpdateTransaction("success", orderId)
// 		}
// 	} else if transactionStatus == "settlement" {
// 		// TODO set transaction status on your databaase to 'success'
// 		h.TransactionRepository.UpdateTransaction("success", orderId)
// 	} else if transactionStatus == "deny" {
// 		// TODO you can ignore 'deny', because most of the time it allows payment retries
// 		// and later can become success
// 		h.TransactionRepository.UpdateTransaction("failed", orderId)
// 	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
// 		// TODO set transaction status on your databaase to 'failure'
// 		h.TransactionRepository.UpdateTransaction("failed", orderId)
// 	} else if transactionStatus == "pending" {
// 		// TODO set transaction status on your databaase to 'pending' / waiting payment
// 		h.TransactionRepository.UpdateTransaction("pending", orderId)
// 	}

// 	w.WriteHeader(http.StatusOK)
// }
