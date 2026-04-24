```javascript
/**
 * JADDY STUDIO - API Connection Handler (ROEX TONN API)
 * Este archivo centraliza el análisis profesional de voces mediante RoEx.
 */

const JaddyAPI = {
    config: {
        // Tu llave de RoEx
        roexKey: "AIzaSyCrwU3NTViFTwJ-t6BMURPS8X2y__FJ4Qc", 
        roexBaseUrl: "https://api.roex.io/v1" 
    },

    /**
     * Módulo de Análisis de Audio Profesional
     * Envía el audio a RoEx para obtener el perfil tonal exacto.
     */
    async analyzeAudio(file) {
        console.log("Jaddy Studio: Iniciando análisis tonal en RoEx...");
        
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${this.config.roexBaseUrl}/analyze`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.roexKey}`
                },
                body: formData
            });

            if (!response.ok) {
                console.error("Error en respuesta de RoEx:", response.status);
                throw new Error('Error en la conexión con RoEx');
            }

            const data = await response.json();
            
            // Mapeamos los resultados de RoEx a lo que necesita logic.js
            // RoEx suele devolver 'low_mid_resonance' o similares
            return {
                muddy_freq: data.tonal_analysis?.problem_frequencies?.muddy || 400,
                sibilance_freq: data.tonal_analysis?.problem_frequencies?.sibilance || 7500,
                gain_suggestion: data.loudness?.target_gain || 0
            };

        } catch (error) {
            console.error("Error en Jaddy Connection (RoEx):", error);
            // Si la API falla por red, devolvemos un perfil seguro para no trabar al usuario
            return { muddy_freq: 410, sibilance_freq: 7800 };
        }
    },

    async submitToDistribution(trackData) {
        console.log("Módulo Jaddy Music Records en desarrollo...");
    }
};

// Lo hacemos global para que el botón del HTML lo encuentre
window.JaddyAPI = JaddyAPI;

```
