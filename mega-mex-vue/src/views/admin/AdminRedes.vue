<template>
  <section class="pagina-redes">

    <!-- ENCABEZADO -->
    <div class="encabezado">

      <div>
        <span class="categoria">
          COMUNICACIÓN
        </span>

        <h2>
          📱 Administración de Redes
        </h2>

        <p>
          Administra los enlaces de las redes sociales de Mega-Mex.
        </p>
      </div>

      <button
        class="btn-guardar"
        @click="guardarRedes"
      >
        💾 Guardar cambios
      </button>

    </div>


    <!-- FORMULARIO -->
    <div class="contenedor">

      <!-- FACEBOOK -->
      <div class="red-card">

        <div class="red-icon facebook">
          f
        </div>

        <div class="red-datos">

          <label>
            Facebook
          </label>

          <p>
            Enlace de la página oficial de Mega-Mex.
          </p>

          <input
            v-model="redes.facebook"
            type="url"
            placeholder="https://www.facebook.com/..."
          >

        </div>

      </div>


      <!-- INSTAGRAM -->
      <div class="red-card">

        <div class="red-icon instagram">
          ◎
        </div>

        <div class="red-datos">

          <label>
            Instagram
          </label>

          <p>
            Enlace del perfil oficial de Instagram.
          </p>

          <input
            v-model="redes.instagram"
            type="url"
            placeholder="https://www.instagram.com/..."
          >

        </div>

      </div>


      <!-- WHATSAPP -->
      <div class="red-card">

        <div class="red-icon whatsapp">
          ☎
        </div>

        <div class="red-datos">

          <label>
            WhatsApp
          </label>

          <p>
            Número de contacto con código de país.
          </p>

          <input
            v-model="redes.whatsapp"
            type="text"
            placeholder="Ejemplo: 529531234567"
          >

        </div>

      </div>

    </div>


    <!-- MENSAJE -->
    <transition name="mensaje">

      <div
        v-if="mensaje"
        class="mensaje"
      >
        ✅ {{ mensaje }}
      </div>

    </transition>

  </section>
</template>


<script setup>

import {
  ref,
  onMounted
} from 'vue'


const mensaje = ref('')


const redes = ref({

  facebook: '',

  instagram: '',

  whatsapp: ''

})


// ============================================
// CARGAR DATOS GUARDADOS
// ============================================

onMounted(() => {

  const datosGuardados =
    localStorage.getItem('megaMexRedes')


  if (datosGuardados) {

    try {

      redes.value =
        JSON.parse(datosGuardados)

    } catch {

      redes.value = {
        facebook: '',
        instagram: '',
        whatsapp: ''
      }

    }

  }

})


// ============================================
// GUARDAR
// ============================================

const guardarRedes = () => {

  localStorage.setItem(
    'megaMexRedes',
    JSON.stringify(redes.value)
  )


  mensaje.value =
    'Redes sociales actualizadas correctamente.'


  setTimeout(() => {

    mensaje.value = ''

  }, 3000)

}

</script>


<style scoped>

.pagina-redes {
  margin-top: 30px;
}


/* ENCABEZADO */

.encabezado {

  padding: 28px 32px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 20px;

  background: white;

  border-radius: 20px;

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.06);

}


.categoria {

  color: #e53278;

  font-size: 11px;

  font-weight: bold;

  letter-spacing: 1px;

}


.encabezado h2 {

  margin: 8px 0;

  color: #202938;

  font-size: 25px;

}


.encabezado p {

  margin: 0;

  color: #7c8490;

}


.btn-guardar {

  padding: 13px 20px;

  border: none;

  border-radius: 12px;

  background: #006bc5;

  color: white;

  cursor: pointer;

  font-weight: bold;

  transition: 0.25s;

}


.btn-guardar:hover {

  background: #00549c;

  transform: translateY(-2px);

}


/* CONTENEDOR */

.contenedor {

  margin-top: 22px;

  padding: 35px;

  display: flex;

  flex-direction: column;

  gap: 22px;

  background: white;

  border-radius: 20px;

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.05);

}


/* TARJETAS */

.red-card {

  padding: 22px;

  display: flex;

  align-items: center;

  gap: 20px;

  border:
    1px solid #e8ecf0;

  border-radius: 16px;

  transition: 0.25s;

}


.red-card:hover {

  border-color: #cbd8e5;

  box-shadow:
    0 6px 18px
    rgba(0, 0, 0, 0.05);

}


/* ICONOS */

.red-icon {

  width: 65px;

  height: 65px;

  min-width: 65px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 18px;

  color: white;

  font-size: 35px;

  font-weight: bold;

}


.facebook {

  background: #1877f2;

}


.instagram {

  background:
    linear-gradient(
      135deg,
      #833ab4,
      #e1306c,
      #f77737
    );

}


.whatsapp {

  background: #25d366;

}


/* DATOS */

.red-datos {

  width: 100%;

}


.red-datos label {

  color: #202938;

  font-size: 16px;

  font-weight: bold;

}


.red-datos p {

  margin: 4px 0 12px;

  color: #89919d;

  font-size: 13px;

}


.red-datos input {

  width: 100%;

  padding: 14px 16px;

  border:
    1px solid #dfe4ea;

  border-radius: 10px;

  outline: none;

  font-size: 14px;

}


.red-datos input:focus {

  border-color: #006bc5;

  box-shadow:
    0 0 0 3px
    rgba(0, 107, 197, 0.10);

}


/* MENSAJE */

.mensaje {

  position: fixed;

  z-index: 9999;

  right: 30px;

  bottom: 30px;

  padding: 16px 20px;

  border-radius: 12px;

  background: #1e9d68;

  color: white;

  font-weight: bold;

  box-shadow:
    0 10px 30px
    rgba(0, 0, 0, 0.20);

}


.mensaje-enter-active,
.mensaje-leave-active {

  transition: 0.3s;

}


.mensaje-enter-from,
.mensaje-leave-to {

  opacity: 0;

  transform:
    translateY(20px);

}


/* RESPONSIVE */

@media (max-width: 700px) {

  .encabezado {

    flex-direction: column;

    align-items: flex-start;

  }


  .btn-guardar {

    width: 100%;

  }


  .red-card {

    flex-direction: column;

    align-items: flex-start;

  }

}

</style>