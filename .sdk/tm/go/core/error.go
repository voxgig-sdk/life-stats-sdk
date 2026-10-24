package core

import "encoding/json"

type LifeStatsError struct {
	IsLifeStatsError bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
	// The HTTP status, -1 when there was no response.
	Status int
}

func NewLifeStatsError(code string, msg string, ctx *Context) *LifeStatsError {
	return &LifeStatsError{
		IsLifeStatsError: true,
		Sdk:                "LifeStats",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
		Status:             -1,
	}
}

func (e *LifeStatsError) NotFound() bool {
	return 404 == e.Status
}

func (e *LifeStatsError) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *LifeStatsError) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"status":  e.Status,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *LifeStatsError) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
