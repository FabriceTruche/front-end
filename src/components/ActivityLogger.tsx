import React, { useEffect, useRef } from "react";

interface ActivityLoggerProps {
    logs: string[];
    title?: string;
    maxHeight?: string | number;
    /** 🎯 Nouvelle prop : Fonction déclenchée au clic sur le bouton effacer */
    onClear?: () => void;
}

export const ActivityLogger: React.FC<ActivityLoggerProps> = ({
                                                                  logs,
                                                                  title = "🖥️ Traces d'activité applicatives :",
                                                                  maxHeight = "115px",
                                                                  onClear
                                                              }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "6px", backgroundColor: "#2d3436" }}>
            {/* 🔄 Barre de titre flexible pour aligner le bouton à droite */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h4 style={{ margin: 0, color: "#00cec9" }}>{title}</h4>

                {/* On n'affiche le bouton que si la fonction onClear est fournie et qu'il y a des logs */}
                {onClear && logs.length > 0 && (
                    <button
                        onClick={onClear}
                        style={{
                            backgroundColor: "transparent",
                            border: "1px solid #ff7675",
                            color: "#ff7675",
                            borderRadius: "4px",
                            padding: "2px 8px",
                            fontSize: "11px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ff7675";
                            e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#ff7675";
                        }}
                    >
                        🗑️ Effacer
                    </button>
                )}
            </div>

            <div
                ref={scrollContainerRef}
                style={{
                    height: maxHeight,
                    overflowY: "auto",
                    background: "#1e272e",
                    padding: "10px",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    color: "#fff",
                    scrollBehavior: "smooth"
                }}
            >
                {logs.length === 0 ? (
                    <span style={{ color: "#57606f" }}>En attente d'actions...</span>
                ) : (
                    logs.map((log, index) => (
                        <div key={index} style={{ marginBottom: "4px", borderBottom: "1px solid #2f3640", paddingBottom: "2px" }}>
                            {log}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};