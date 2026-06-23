import { useState } from "react";
import api from "../services/api";
import {
  Bot,
  Sparkles,
  Brain,
  ShieldAlert,
} from "lucide-react";

function Copilot() {
  const [question, setQuestion] =
    useState("");

  const [response, setResponse] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const askCopilot = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const res = await api.post(
        "/copilot/ask",
        {
          question,
        }
      );

      setResponse(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "34px",
            marginBottom: "8px",
          }}
        >
          AI Operations Copilot
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Ask questions about
          incidents, outages,
          root causes and
          recommended actions.
        </p>
      </div>

      {/* CHAT CONTAINER */}

      <div
        style={{
          background:
            "rgba(15,23,42,.95)",
          border:
            "1px solid rgba(139,92,246,.25)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow:
            "0 10px 40px rgba(0,0,0,.35)",
        }}
      >
        {/* INPUT */}

        <div
          style={{
            padding: "25px",
            borderBottom:
              "1px solid #1e293b",
          }}
        >
          <textarea
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            placeholder="Example: Why are database incidents increasing this week?"
            rows={4}
            style={{
              width: "100%",
              background:
                "#020617",
              color: "white",
              border:
                "1px solid #334155",
              borderRadius: "16px",
              padding: "16px",
              fontSize: "16px",
              resize: "none",
              outline: "none",
            }}
          />

          <button
            onClick={askCopilot}
            disabled={loading}
            style={{
              marginTop: "15px",
              background:
                "linear-gradient(135deg,#8b5cf6,#6366f1)",
              color: "white",
              border: "none",
              padding:
                "12px 24px",
              borderRadius:
                "12px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {loading
              ? "Analyzing..."
              : "Ask Copilot"}
          </button>
        </div>

        {/* EMPTY STATE */}

        {!response &&
          !loading && (
            <div
              style={{
                padding:
                  "50px 30px",
                textAlign:
                  "center",
              }}
            >
              <Bot
                size={60}
                color="#8b5cf6"
              />

              <h2
                style={{
                  color:
                    "white",
                  marginTop:
                    "20px",
                }}
              >
                AI Assistant Ready
              </h2>

              <p
                style={{
                  color:
                    "#94a3b8",
                }}
              >
                Ask about root
                causes,
                infrastructure
                failures,
                database issues,
                incident trends
                and resolution
                strategies.
              </p>
            </div>
          )}

        {/* LOADING */}

        {loading && (
          <div
            style={{
              padding: "40px",
              textAlign:
                "center",
            }}
          >
            <Sparkles
              size={40}
              color="#8b5cf6"
            />

            <h3
              style={{
                color:
                  "white",
                marginTop:
                  "15px",
              }}
            >
              AI is analyzing...
            </h3>
          </div>
        )}

        {/* RESPONSE */}

        {response && !loading && (
          <div
            style={{
              padding: "25px",
            }}
          >
            {/* QUESTION */}

            <div
              style={{
                background:
                  "#111827",
                padding: "20px",
                borderRadius:
                  "16px",
                marginBottom:
                  "20px",
              }}
            >
              <h3
                style={{
                  color:
                    "#8b5cf6",
                }}
              >
                Your Question
              </h3>

              <p
                style={{
                  color:
                    "white",
                }}
              >
                {
                  response.question
                }
              </p>
            </div>

            {/* ROOT CAUSE */}

            <div
              style={{
                background:
                  "#111827",
                padding: "20px",
                borderRadius:
                  "16px",
                marginBottom:
                  "20px",
              }}
            >
              <h3
                style={{
                  color:
                    "#ef4444",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: "8px",
                }}
              >
                <Brain
                  size={20}
                />
                Root Cause
              </h3>

              <p
                style={{
                  color:
                    "white",
                  lineHeight:
                    "1.8",
                }}
              >
                {
                  response
                    .answer
                    .root_cause
                }
              </p>
            </div>

            {/* CONFIDENCE */}

            <div
              style={{
                background:
                  "#111827",
                padding: "20px",
                borderRadius:
                  "16px",
                marginBottom:
                  "20px",
              }}
            >
              <h3
                style={{
                  color:
                    "#22c55e",
                }}
              >
                Confidence Score
              </h3>

              <h1
                style={{
                  color:
                    "#22c55e",
                }}
              >
                {Math.round(
                  response
                    .answer
                    .confidence *
                    100
                )}
                %
              </h1>
            </div>

            {/* ACTIONS */}

            <div
              style={{
                background:
                  "#111827",
                padding: "20px",
                borderRadius:
                  "16px",
              }}
            >
              <h3
                style={{
                  color:
                    "#f59e0b",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: "8px",
                }}
              >
                <ShieldAlert
                  size={20}
                />
                Recommended
                Actions
              </h3>

              <ul
                style={{
                  color:
                    "white",
                  marginTop:
                    "15px",
                }}
              >
                {response.answer.recommended_actions?.map(
                  (
                    action,
                    index
                  ) => (
                    <li
                      key={
                        index
                      }
                      style={{
                        marginBottom:
                          "12px",
                        lineHeight:
                          "1.7",
                      }}
                    >
                      ✓ {action}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Copilot;