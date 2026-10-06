
export const FormConfirmDelete = ({ data, onSubmit }: { data: any; onSubmit: (data: any) => void }) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(data); // Déclenche manuellement la suppression
            }}
            style={{ padding: "10px 0", textAlign: "center" }}
        >
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>⚠️</div>
            <p style={{ fontSize: "16px", color: "#2f3640", margin: "0 0 10px 0" }}>
                Vous êtes sur le point de supprimer l'enregistrement <strong>#{data.ID}</strong>.
            </p>
            <p style={{ fontSize: "14px", color: "#778ca3", margin: "0 0 25px 0" }}>
                Cette action est irréversible. Souhaitez-vous continuer ?
            </p>

            {/* Bouton de confirmation au design "Danger" aligné sur la charte graphique */}
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#eb4d4b",
                        color: "#fff",
                        border: "none",
                        padding: "10px 24px",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        boxShadow: "0 2px 5px rgba(235, 77, 75, 0.3)",
                        transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ff7675"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#eb4d4b"}
                >
                    💥 Confirmer la suppression 🗑️
                </button>
            </div>
        </form>
    );
};

