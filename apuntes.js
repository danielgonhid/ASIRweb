// Apuntes de teoría. Se ven plegados debajo de los comandos de su mismo tema.
// Para añadir uno: copia un bloque { asig, seccion, tema, titulo, html }. El html va tal cual, sin acentos graves (usa &#96;).
const APUNTES = [
  { asig: "ISO", seccion: "Intro y virtualización", tema: "Conceptos de SO", titulo: "¿Qué es un Sistema Operativo?", html: r`
<div class="note">
Es el software principal que tiene dos funciones clave:
<br>1. <strong>Controlar y gestionar</strong> todos los recursos HW (disco, memoria, CPU) y procesos (tareas simples como abrir un programa).
<br>2. <strong>Proporcionar una interfaz</strong> (textual o gráfica) que actúa de intermediario entre el usuario y la máquina.
</div>
<div class="callout ci"><span class="ci2">💡</span><div><strong>Esquema de capas:</strong> Usuario ➔ Aplicación ➔ Sistema Operativo ➔ Hardware.</div></div>
` },

  { asig: "ISO", seccion: "Intro y virtualización", tema: "Conceptos de SO", titulo: "Clasificación de SO", html: r`
<div class="grid2">
<div class="ic"><div class="ic-lbl">Multitarea</div><div class="ic-val">Ilusión de simultaneidad</div><div class="ic-sub">En vez de hacer todo a la vez, dedica unos milisegundos a cada tarea creando la ilusión de que es simultáneo.</div></div>
<div class="ic"><div class="ic-lbl">Multiproceso</div><div class="ic-val">Aprovecha varios núcleos</div><div class="ic-sub">Aunque los PC de sobremesa tienen 1 solo procesador, los SO modernos saben aprovechar sus múltiples núcleos.</div></div>
<div class="ic"><div class="ic-lbl">Tiempo Compartido</div><div class="ic-val">"Cuando pueda te atiendo"</div><div class="ic-sub">Va dando ciclos de CPU a los procesos. No es como el <em>Tiempo Real</em> que debe responder en milisegundos exactos.</div></div>
<div class="ic"><div class="ic-lbl">Red vs Distribuido</div><div class="ic-val">Grupos de máquinas</div><div class="ic-sub"><strong>Red:</strong> Comparten recursos pero se ven como máquinas separadas.<br><strong>Distribuido:</strong> Se ven como una sola máquina (+ centralizado, + capacidad).</div></div>
</div>
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>¿Windows es multiusuario?</strong> Sí lo es. Pero ¡ojo! por defecto, si te conectas por Escritorio Remoto (RDP), expulsa al usuario que ya estaba activo por un tema de limitación de <strong>licencias</strong>, no por limitación técnica.</div></div>
` },

  { asig: "ISO", seccion: "Intro y virtualización", tema: "Conceptos de SO", titulo: "Arquitectura del núcleo (kernel)", html: r`
<div class="note">El Kernel es la parte fundamental del SO que administra el hardware y los procesos. Hoy en día, Windows (NT) es <strong>Híbrido</strong> (toma lo mejor de ambos mundos: monolítico y microkernel) y Linux es <strong>monolítico modular</strong> (carga y descarga módulos en caliente).</div>
<table class="dt">
<tr><th>Arquitectura</th><th>Defensor Histórico</th><th>Características</th></tr>
<tr><td>Monolítico</td><td>Linus Torvalds (Linux)</td><td>Todo sobre el espacio Kernel. Muy rápido, pero un fallo en un driver colapsa el SO.</td></tr>
<tr><td>Microkernel</td><td>Andrew Tanenbaum (Minix)</td><td>Lo básico en Kernel, el resto de servicios en espacio de usuario. Más seguro.</td></tr>
</table>
<div class="callout ct"><span class="ci2">🥷</span><div><strong>Truco Ninja:</strong> Si en Windows se te bloquea el entorno gráfico, pulsa <code>Ctrl + Windows + Shift + B</code>. Esto reinicia el driver de vídeo sin necesidad de reiniciar el Kernel del ordenador (¡te puede salvar la vida!).</div></div>
` },

  { asig: "ISO", seccion: "Intro y virtualización", tema: "Conceptos de SO", titulo: "Sistemas de ficheros", html: r`
<table class="dt">
<tr><th>Sistema</th><th>Compatibilidad / Uso</th></tr>
<tr><td>FAT32</td><td>Compatible con todo, pero con archivos de 4 GB como máximo. En USB, hoy es mejor exFAT.</td></tr>
<tr><td>NTFS</td><td>Windows (Nativo)</td></tr>
<tr><td>ext4</td><td>Linux (Por defecto)</td></tr>
<tr><td>APFS (antes HFS+)</td><td>macOS (Apple)</td></tr>
<tr><td>XFS</td><td>Linux: rápido con archivos grandes. Por defecto en Red Hat.</td></tr>
<tr><td>iso9660</td><td>Formato estándar para CD-ROM / DVD.</td></tr>
</table>
<div class="callout ci"><span class="ci2">📉</span><div><strong>¿Por qué mi disco de 1TB marca 931GB en Windows?</strong><br>No se pierde nada: cambia la unidad. El fabricante cuenta de 1000 en 1000 (1 TB = 1.000.000.000.000 bytes) y Windows de 1024 en 1024, aunque escriba GB en vez de GiB.</div></div>
` },

  { asig: "ISO", seccion: "Intro y virtualización", tema: "Conceptos de SO", titulo: "Particiones (MBR vs GPT) y volúmenes", html: r`
<div class="note">
<strong>Regla de oro:</strong> Particionar SIEMPRE al instalar un SO. La partición es la división lógica del almacenamiento.<br>
• <strong>BIOS:</strong> Pequeño software instalado físicamente en la placa base (Usa particionamiento MBR).<br>
• <strong>UEFI:</strong> Igual que BIOS pero más moderno (Usa GPT). Permite modo "Legacy" para comportarse como BIOS y usar MBR (Windows 11 ya NO permite esto).
</div>
<div class="callout cw"><span class="ci2">⛔</span><div><strong>¿Puedo elegir MBR o GPT al instalar un SO?</strong> Normalmente <strong>no</strong>: el instalador mira si has arrancado en BIOS o en UEFI y aplica el que toca. Para elegirlo tú, prepara antes el disco con GParted o, en el instalador de Windows, con <code>diskpart</code> (Mayús + F10).</div></div>
<div class="callout ce"><span class="ci2">🎓</span><div><strong>PREGUNTAS CLÁSICAS DE EXAMEN:</strong><br><strong>1. Redundancia GPT:</strong> A diferencia de MBR, GPT tiene redundancia. Guarda la <strong>cabecera y la tabla de particiones</strong> tanto al <strong>inicio</strong> como al <strong>final</strong> del disco por si se estropean.<br><strong>2. Límites MBR:</strong> MBR solo permite 4 particiones primarias. Si necesitas más, la 4ª debe ser Extendida, y dentro crear "Lógicas" (Empiezan siempre en <code>/dev/sda5</code>).<br><strong>3. Volúmenes Lógicos (LVM) vs Particiones:</strong> Con particiones clásicas, para ampliar espacio hay que mover particiones enteras (difícil y peligroso). <strong>LVM permite añadir espacio y redimensionar "en caliente" sin mover nada.</strong></div></div>
<div class="callout ci"><span class="ci2">🦠</span><div><strong>Curiosidad MBR:</strong> El gestor de arranque (Bootloader) se guarda en el <strong>Sector 0</strong> del disco. Antiguamente, los virus se metían ahí; no perdías datos, pero el sistema literalmente no sabía cómo arrancar.</div></div>
` },

  { asig: "ISO", seccion: "Intro y virtualización", tema: "Virtualización", titulo: "Operaciones frecuentes (VirtualBox)", html: r`
<div class="note"><strong>Guest Additions:</strong> Drivers que se instalan <em>dentro</em> de la MV para integración del ratón, carpetas compartidas y portapapeles.<br><br><strong>Snapshots (Instantáneas):</strong> ¡Cuidado, <strong>no son un Backup</strong>! Son una copia de la información del almacenamiento en ese instante exacto para volver atrás en caliente (se parecen a un punto de restauración de Windows, pero de toda la máquina).<br><br><strong>Importar / Exportar:</strong> Guarda una MV entera en un archivo <code>.ova</code>.</div>
` },

  { asig: "ISO", seccion: "Intro y virtualización", tema: "Virtualización", titulo: "Modos de red en VirtualBox", html: r`
<table class="dt">
<tr><th>Modo de Red</th><th>Acceso a Internet</th><th>Comunicación MV - MV</th><th>Visible en Red Física</th></tr>
<tr><td>NAT</td><td>✅ Sí</td><td>❌ No</td><td>❌ No</td></tr>
<tr><td>Adaptador Puente</td><td>✅ Sí</td><td>✅ Sí</td><td>✅ Sí</td></tr>
<tr><td>Red Interna</td><td>❌ No</td><td>✅ Sí</td><td>❌ No</td></tr>
<tr><td>Red NAT</td><td>✅ Sí</td><td>✅ Sí</td><td>❌ No</td></tr>
<tr><td>Red Solo Anfitrión</td><td>❌ No</td><td>✅ Sí</td><td>❌ No</td></tr>
</table>
` },

  { asig: "ISO", seccion: "Intro y virtualización", tema: "Virtualización", titulo: "Hipervisores (gestores de MVs)", html: r`
<div class="grid2">
<div class="ic"><div class="ic-lbl">Tipo 1 (Bare-Metal)</div><div class="ic-val">Directo al Hardware</div><div class="ic-sub">No hay SO anfitrión: trabaja directo con el HW. Muy potente.<br><em>Ej: Proxmox, VMware ESXi.</em></div></div>
<div class="ic"><div class="ic-lbl">Tipo 2 (Hosted)</div><div class="ic-val">Sobre SO Anfitrión</div><div class="ic-sub">Capa de software sobre tu Windows/Linux.<br><em>Ej: VirtualBox, VMware Workstation.</em></div></div>
</div>
<div class="callout ci"><span class="ci2">⚙️</span><div><strong>Ojo con las integraciones:</strong> Hyper-V (Tipo 1 encubierto) ya viene integrado en Windows, pero hay que activarlo. KVM también viene integrado en el propio Kernel de Linux, pero requiere activación.</div></div>
<div class="callout ce"><span class="ci2">🎓</span><div><strong>PREGUNTA DE EXAMEN (BIOS/UEFI):</strong><br>Para poder virtualizar a buen rendimiento, hay que activar la <em>Virtualización asistida por Hardware</em> en la BIOS/UEFI. Sus nombres en clave son:<br>• Intel: <strong>VT-x</strong> (Codename: <em>Vanderpool</em>)<br>• AMD: <strong>AMD-V</strong> (Codename: <em>Pacifica</em>)</div></div>
` },

  { asig: "ISO", seccion: "Intro y virtualización", tema: "Virtualización", titulo: "Contenedores y cloud computing", html: r`
<div class="note"><strong>Contenedores (MVs Ligeras):</strong> No llevan núcleo propio: comparten el del anfitrión y traen sus propias librerías.<br><br>• <strong>Docker:</strong> Herramienta para CREAR y ejecutar los contenedores.<br>• <strong>Kubernetes:</strong> Orquestador que GESTIONA esos contenedores a gran escala.<br>• <strong>Cloud Computing:</strong> AWS (Amazon), Azure (Microsoft) y Google Cloud son los líderes mundiales. <strong>OpenStack</strong> es una plataforma en la nube de código abierto (¡Dato: a los admins de esto se les paga muy bien!).<br>• <strong>Virtualización de Redes:</strong> SDN (redes definidas por software) y NFV (cortafuegos, routers o DNS virtuales).</div>
` },

  { asig: "ISO", seccion: "Intro y virtualización", tema: "Instalación", titulo: "GParted y particionado desde fuera", html: r`
<div class="callout ci"><span class="ci2">💽</span><div><strong>GParted (GNOME Partition Editor):</strong> Siempre es más adecuado usar el particionador integrado del SO, pero están limitados. En Windows, para particionar desde fuera (GParted en USB Live), recuerda que <strong>tienes que deshabilitar BitLocker</strong> primero o no podrás leer el disco.</div></div>
` },

  { asig: "ISO", seccion: "Intro y virtualización", tema: "Instalación", titulo: "Instalaciones desatendidas", html: r`
<div class="note">Automatizan la instalación del SO para entornos corporativos, leyendo las respuestas desde un archivo:<br>• <span style="color:var(--win)">Windows:</span> <code>autounattend.xml</code> (busca auto al arrancar el USB/DVD).<br>• <span style="color:var(--linux)">Debian/Ubuntu:</span> <code>preseed.cfg</code> (parámetro <code>auto url=</code>). Ubuntu Server actual usa <code>autoinstall</code>.<br>• <span style="color:var(--danger)">Red Hat y derivadas:</span> <code>ks.cfg</code> (parámetro <code>inst.ks=</code> al iniciar; antes <code>ks=</code>).</div>
` },

  { asig: "ISO", seccion: "Intro y virtualización", tema: "Instalación", titulo: "Dual boot: primero Windows", html: r`
<div class="callout ct"><span class="ci2">🥷</span><div><strong>Regla de oro de Dual Boot:</strong> A la hora de tener 2 SO en un equipo, se instala <strong>PRIMERO Windows</strong> y luego Linux. Linux es capaz de detectar que ya existe Windows y respetarlo creando el GRUB, pero Windows suele sobrescribir el arranque si se instala después.<br>Si Windows no sale en el GRUB: <code>GRUB_DISABLE_OS_PROBER=false</code> en <code>/etc/default/grub</code> y <code>sudo update-grub</code> (con el paquete <code>os-prober</code>).</div></div>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Sistema", titulo: "Origen de Linux, terminales y GRUB", html: r`
<div class="note"><strong>Ojo: UNIX no es LINUX.</strong> <br>• <strong>UNIX:</strong> Creado por Ken Thompson y Dennis Ritchie en 1969 (Bell Labs). Su versión comercial de 1982 no era de código abierto.<br>• <strong>Minix:</strong> Sistema educativo de Andrew Tanenbaum (1987), con el código a la vista para aprender.<br>• <strong>Linux:</strong> En 1991, <strong>Linus Torvalds</strong> desarrolló el Kernel Linux (inspirado en UNIX, pero desde 0). Unido a las herramientas del proyecto GNU de Richard Stallman forma <strong>GNU/Linux</strong> (admite drivers libres y también privativos, como el de NVIDIA).</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">GUI (Graphical User Interface)</div><div class="ic-val">Entorno Gráfico</div><div class="ic-sub">Visual para usuario final. Por debajo funciona gracias al sistema de ventanas <strong>X Window System</strong> o al moderno <strong>Wayland</strong>.</div></div>
<div class="ic"><div class="ic-lbl">CLI (Command Line Interface)</div><div class="ic-val">Línea de Comandos</div><div class="ic-sub">Potente y programable (Scripts). Se accede vía <code>tty</code>: <code>pts/0</code> (Terminal Gráfica) o <code>tty1</code> (Consola de Texto puro).</div></div>
</div>
<div class="callout ci"><span class="ci2">💻</span><div><strong>Terminales Virtuales y GRUB:</strong> Linux tiene 6 terminales de texto. Accedes con <code>Ctrl + Alt + F1</code> a <code>F6</code>. El entorno gráfico suele estar en tty1 o tty2 (antiguamente, en tty7). El <strong>GRUB</strong> es la pantallita negra inicial que te permite elegir qué Sistema Operativo arrancar (si tienes varios).</div></div>
<div class="callout ct"><span class="ci2">⌨️</span><div><strong>Truco Ninja (Multilínea en Bash):</strong> Si un comando es muy largo, puedes usar <code>\ + enter</code> para pasar a la siguiente línea sin ejecutarlo todavía.</div></div>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Ficheros", titulo: "Conceptos clave de Linux", html: r`
<div class="callout ce"><span class="ci2">🎓</span><div><strong>CONCEPTOS CLAVE DE LINUX (Examen)</strong><br>1. <strong>TODO es un archivo:</strong> Un disco, un USB, la pantalla de tu terminal... para Linux, todo se gestiona como si fuera un archivo (la excepción clásica son las tarjetas de red, que no aparecen en <code>/dev</code>).<br>2. <strong>Case Sensitive:</strong> Linux distingue rígidamente entre mayúsculas y minúsculas (<code>Foto.jpg</code> es distinto a <code>foto.jpg</code>). Windows "se lo traga" y da igual.</div></div>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Ficheros", titulo: "El árbol de directorios", html: r`
<div class="note">A diferencia de Windows (que crea un árbol C:, D: por cada disco), Linux tiene una jerarquía unificada bajo un solo directorio raíz <code>/</code>.</div>
<table class="dt">
<tr><th>Directorio</th><th>Contenido Principal</th></tr>
<tr><td><code>/bin</code> vs <code>/sbin</code></td><td><code>bin</code>: Comandos para el usuario normal.<br><code>sbin</code>: Comandos fundamentales del Administrador (root).</td></tr>
<tr><td><code>/home</code></td><td>Datos del usuario (ej. <code>/home/heidi</code>). Atajo: <code>~</code></td></tr>
<tr><td><code>/etc</code></td><td>Archivos de <strong>configuración</strong> del sistema y servicios.</td></tr>
<tr><td><code>/var</code></td><td>Datos variables (ej. <code>/var/log/auth.log</code>, registros de acceso).</td></tr>
<tr><td><code>/dev</code> y <code>/media</code></td><td><code>dev</code> = Dispositivos físicos (terminales, discos).<br><code>media</code> = Lo que montas (USB insertados).</td></tr>
<tr><td><code>/usr</code></td><td>Programas, librerías y documentación. En Debian y Ubuntu actuales, <code>/bin</code> y <code>/sbin</code> son enlaces a <code>/usr/bin</code> y <code>/usr/sbin</code>.</td></tr>
</table>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Ficheros", titulo: "Inodos y enlaces", html: r`
<div class="note">Un <strong>Inodo</strong> es la entrada real en la tabla del disco que indica dónde se guarda físicamente un archivo. Un archivo no es su nombre, es su inodo.</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">Enlace Blando (Simbólico)</div><div class="ic-val">Apunta a la ruta</div><div class="ic-sub">Es como el acceso directo de Windows. Si borras o mueves el archivo original, el enlace se rompe.</div></div>
<div class="ic"><div class="ic-lbl">Enlace Duro (Hard Link)</div><div class="ic-val">Apunta al inodo</div><div class="ic-sub">Siempre sabe dónde está el archivo aunque le cambies el nombre o la ruta, porque apunta a su espacio físico en el disco duro.</div></div>
</div>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Ficheros", titulo: "Papelera desde la terminal", html: r`
<div class="callout ct"><span class="ci2">🗑️</span><div><strong>Truco Ninja: Papelera desde Terminal.</strong><br>Si usas interfaz gráfica y borras algo sin querer, puedes recuperarlo desde la terminal yendo a: <code>~/.local/share/Trash/files</code></div></div>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Filtros y texto", titulo: "Redireccionamiento", html: r`
<div class="note">Por defecto: <strong>0</strong> (Entrada/Teclado), <strong>1</strong> (Salida Normal/Pantalla), <strong>2</strong> (Salida Errores).<br>• <code>></code> Sobrescribe el archivo.<br>• <code>>></code> Añade al final del archivo.<br>• <code>2></code> Redirige solo los errores.</div>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Comprimir", titulo: "Empaquetar vs comprimir", html: r`
<div class="callout ce"><span class="ci2">🎓</span><div><strong>PREGUNTA DE EXAMEN: Empaquetar vs Comprimir</strong><br>• <strong>Empaquetar (.tar):</strong> Juntar varios archivos en uno solo, SIN reducir el tamaño.<br>• <strong>Comprimir (.gz, .bz2):</strong> Reducir el tamaño, de un solo archivo cada vez. Por eso en Linux primero se empaqueta y luego se comprime (<code>.tar.gz</code>). <code>zip</code> hace las dos cosas.</div></div>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Usuarios y permisos", titulo: "Estructura de permisos", html: r`
<div class="note">Los permisos se dividen en 3 bloques de 3 letras: <strong>Propietario</strong> (u), <strong>Grupo</strong> (g) y <strong>Resto/Otros</strong> (o).<br>• <code>r</code> (Lectura - 4)<br>• <code>w</code> (Escritura - 2)<br>• <code>x</code> (Ejecución - 1)<br><br><em>Ejemplo:</em> <code>-rwxr-xr--</code> significa 754 (Propietario todo, grupo lee/ejecuta, resto lee).</div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "Variables y scripts", titulo: "Comparar y asignar en Bash", html: r`
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>Ojo al programar scripts y comandos:</strong> <strong>Asignar:</strong> <code>X=5</code>, sin espacios alrededor del <code>=</code>. <strong>Comparar texto:</strong> <code>[ "$X" = "5" ]</code>, con espacios; <code>==</code> también compara, pero es propio de Bash (<code>[[ $X == 5 ]]</code>). <strong>Comparar números:</strong> <code>-eq</code>.</div></div>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Paquetes", titulo: "Imágenes ISO y hash", html: r`
<div class="note"><strong>Imagen ISO:</strong> Es una imagen exacta (sin comprimir) de un disco, que suele contener toda la información "booteable" para instalar un Sistema Operativo.<br><strong>Sistema Hash (SHA256):</strong> Código alfanumérico que certifica que una imagen ISO descargada es verdadera y no ha sido manipulada o corrupta.</div>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Paquetes", titulo: "Ramas de Debian", html: r`
<div class="grid2">
<div class="ic"><div class="ic-lbl">Stable (Estable)</div><div class="ic-val">Para Servidores</div><div class="ic-sub">Todo está requetecomprobado. No entran paquetes nuevos, es un sistema "cerrado". Fiabilidad 100%.</div></div>
<div class="ic"><div class="ic-lbl">Testing (Pruebas)</div><div class="ic-val">Software actualizado</div><div class="ic-sub">Funciona perfecto, tiene software más actual, pero no está "cerrado" (preparación para ser el futuro estable).</div></div>
</div>
<div class="callout ci"><span class="ci2">😈</span><div><strong>Unstable (SID):</strong> La rama de desarrollo activo. Los paquetes nuevos entran directamente aquí y puede romper tu sistema. Siempre se llama "Sid" (el niño rompe-juguetes de Toy Story).</div></div>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Paquetes", titulo: "Gestión de software: APT y DPKG", html: r`
<div class="callout ce"><span class="ci2">🛡️</span><div><strong>Regla de oro de los Administradores de Servidores:</strong> NO instalar jamás archivos <code>.deb</code> ajenos o cosas de fuera de los repositorios oficiales, a menos que sea un software hiper-específico de la empresa.</div></div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">APT (Advanced Package Tool)</div><div class="ic-val">Gestor de Repositorios</div><div class="ic-sub">Descarga de internet y resuelve las dependencias automáticamente.<br><em>Ej: <code>apt install htop</code></em></div></div>
<div class="ic"><div class="ic-lbl">DPKG</div><div class="ic-val">Instalador Local</div><div class="ic-sub">Instala archivos .deb descargados, pero NO resuelve dependencias de red.</div></div>
</div>
` },

  { asig: "ISO", seccion: "Linux básico", tema: "Paquetes", titulo: "Firefox ESR vs Stable", html: r`
<div class="callout ci"><span class="ci2">🦊</span><div><strong>Firefox ESR vs Stable:</strong> Debian trae por defecto <em>Firefox ESR (Extended Support Release)</em> que cambia de versión una vez al año; entre medias solo recibe parches de seguridad. Si instalas manualmente la versión <em>Stable</em>, lo normal es alojarla en <code>/opt</code> y crear su acceso directo con la herramienta <code>alacarte</code>.</div></div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "Discos", titulo: "Sectores y bloques", html: r`
<div class="note">A nivel físico, un disco duro se divide en <strong>Sectores</strong> (512 bytes en los clásicos; 4 KB en los actuales, que suelen simular 512).<br>A nivel lógico, el Sistema Operativo agrupa esos sectores en <strong>Bloques</strong> para leer/escribir más rápido (1 bloque = 4 KB = 8 sectores de 512).</div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "Discos", titulo: "Grabar una ISO en un USB", html: r`
<div class="grid2">
<div class="ic"><div class="ic-lbl">BalenaEtcher / Rufus</div><div class="ic-val">Entorno Gráfico</div><div class="ic-sub">Programas externos que graban la ISO en el USB y hacen que arranque.</div></div>
<div class="ic"><div class="ic-lbl">Comando: dd</div><div class="ic-val">Poder Absoluto</div><div class="ic-sub">Muy potente y peligroso. Viene nativo en la terminal. Si te equivocas de disco destino te borras todo el PC.</div></div>
</div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "Discos", titulo: "Por qué las lógicas empiezan en sda5", html: r`
<div class="callout ce"><span class="ci2">🎓</span><div><strong>PREGUNTA DE EXAMEN (MBR): ¿Por qué las particiones lógicas empiezan SIEMPRE en /dev/sda5?</strong><br>Porque el sistema clásico MBR solo permite registrar un máximo de <strong>4 particiones primarias</strong> (sda1, sda2, sda3, sda4). Si necesitas más de cuatro, tienes que coger una de esas 4 y convertirla en "Extendida". Dentro de la Extendida se crean las particiones "Lógicas", por lo que el sistema siempre empieza a numerarlas a partir de la sda5.</div></div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "Discos", titulo: "Recuperar la contraseña de root", html: r`
<div class="callout ct"><span class="ci2">🔓</span><div><strong>Truco Ninja: recuperar la contraseña de root</strong><br>Si olvidas la clave de root, puedes reiniciar el equipo, editar la línea del kernel en el <strong>GRUB</strong> (pulsando la tecla 'e') y cambiar <code>ro quiet</code> por <code>rw init=/bin/bash</code>. Esto te dará una consola con permisos de root puros sin pedir clave: usa <code>passwd</code> para poner una nueva y <code>exec /sbin/init</code> para seguir arrancando. (Si dejaste <code>ro</code>, antes: <code>mount -o remount,rw /</code>).<br><br>Si el GRUB tiene contraseña: arranca con una Debian Live, monta la partición en <code>/mnt</code>, entra con <code>chroot /mnt</code>, lanza <code>passwd</code>, sal, desmonta y quita la ISO.</div></div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "Redes", titulo: "Nombre del equipo (hostname)", html: r`
<table class="dt">
<tr><th>Archivo / Comando</th><th>Función</th></tr>
<tr><td><code>/etc/hostname</code></td><td>Guarda el nombre del equipo. Requiere reinicio si se edita a mano.</td></tr>
<tr><td><code>/etc/hosts</code></td><td>Actúa como un DNS local. Asocia IPs a nombres de host.</td></tr>
</table>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "Redes", titulo: "Configuración en Debian (interfaces y DNS)", html: r`
<div class="note">Debian (sin entorno gráfico) usa el archivo <code>/etc/network/interfaces</code> para configurar las tarjetas. <br><strong>¡Ojo!</strong> Los DNS solo se pueden poner en este archivo (<code>dns-nameservers</code>) si está instalado el paquete <code>resolvconf</code>; así lo vimos en Debian 13. Si no, van en <code>/etc/resolv.conf</code>.<br><em>Tip: Si hay dos tarjetas o más, el Gateway y el DNS se ponen <strong>solo en una</strong> (la que sale a internet). Al hacerlo, pon <code>systemctl restart networking.service</code> para aplicar cambios.</em></div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "Redes", titulo: "Configuración en Ubuntu Server (Netplan)", html: r`
<div class="note">Ubuntu utiliza <strong>Netplan</strong> (<code>/etc/netplan/</code>). ¡Atención! <strong>NO SE PUEDEN USAR TABULADORES, SOLO ESPACIOS.</strong></div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "SSH y copia remota", titulo: "Administración remota y directorios activos", html: r`
<div class="note">La administración remota permite gestionar servidores sin acceso físico.<br><strong>SSH (Secure Shell):</strong> Es el protocolo estándar en Linux. Cifra de extremo a extremo toda la comunicación. Supera a una VPN si solo necesitas acceso a comandos.</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">Active Directory (AD)</div><div class="ic-val">Ecosistema Windows</div><div class="ic-sub">Servidor de Windows que permite centralizar los usuarios y ordenadores, permitiendo trabajar en tu perfil desde cualquier PC de la empresa.</div></div>
<div class="ic"><div class="ic-lbl">OpenLDAP</div><div class="ic-val">El homólogo de Linux</div><div class="ic-sub">Servicio de directorio de código abierto usado en servidores Linux para centralizar identidades de manera similar a Windows.</div></div>
</div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "SSH y copia remota", titulo: "Clave pública vs privada", html: r`
<div class="callout cw"><span class="ci2">🔑</span><div><strong>Clave Pública vs Privada:</strong> Las claves se crean en tu equipo (el cliente). La Pública (<code>.pub</code>) va para el servidor, y la Privada <strong>NUNCA SE PASA</strong>. Las huellas de los servidores a los que te conectas se guardan en <code>.ssh/known_hosts</code>.</div></div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "SSH y copia remota", titulo: "Opciones avanzadas (sshd_config)", html: r`
<div class="note">Por seguridad, Debian no deja entrar a root por SSH con contraseña (con clave sí). Para permitirlo, hay que editar <code>/etc/ssh/sshd_config</code> y cambiar <code>#PermitRootLogin prohibit-password</code> por <strong><code>PermitRootLogin yes</code></strong> y aplicar con <code>sudo systemctl restart ssh</code>. ⚠️ Es inseguro: solo para prácticas, nunca en un servidor real.<br>Cambiar el puerto por defecto (22) reduce los intentos automáticos, aunque no sustituye a entrar con clave: <code>Port 2222</code>.</div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Primeros pasos", titulo: "Trucos de consola", html: r`
<div class="callout ct"><span class="ci2">🥷</span><div><strong>Trucos Ninja de Consola:</strong> <br>1. <strong>Pasar a siguiente línea:</strong> Usa el acento grave y enter (<code>&#96; + enter</code>) para hacer saltos de línea sin ejecutar en PowerShell.<br>2. <strong>Salir a PowerShell:</strong> Si estás en la consola de <code>sconfig</code> de un Windows Server Core, pulsa la <strong>opción 15</strong> para salir directo a comandos.</div></div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Primeros pasos", titulo: "La guerra de versiones y scripts multiplataforma", html: r`
<div class="note">Microsoft no actualiza automáticamente Windows a PowerShell 7 por <strong>compatibilidad empresarial</strong>. Miles de scripts de servidores de todo el mundo dependen del motor antiguo (.NET Framework).<br><br>Con PowerShell 7 (multiplataforma), existen <strong>variables automáticas</strong> que te permiten crear un único script que funcione distinto según el sistema donde se ejecute: <code>$IsWindows</code>, <code>$IsLinux</code> y <code>$IsMacOS</code>.</div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Primeros pasos", titulo: "Estructura de un cmdlet", html: r`
<div class="note">Los comandos en PowerShell se llaman <strong>Cmdlets</strong> (command-lets) y siempre siguen la misma lógica estricta: <code>Verbo-Sustantivo</code> en inglés singular. (Ej: <code>Get-Process</code>).</div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Primeros pasos", titulo: "PowerShell ISE vs Windows Terminal", html: r`
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>PowerShell ISE vs Windows Terminal:</strong><br><strong>PowerShell ISE</strong> era el entorno gráfico clásico para programar scripts en Windows, pero actualmente está <strong>en desuso y abandonado</strong> por Microsoft. Su reemplazo oficial para ejecutar herramientas es la moderna <strong>Windows Terminal</strong> (que aúna CMD, PowerShell y WSL), y para programar se recomienda usar <em>Visual Studio Code</em>.</div></div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Ficheros", titulo: "System32 vs SysWOW64", html: r`
<div class="callout ce"><span class="ci2">🤯</span><div><strong>La Paradoja de Windows (System32 vs SysWOW64):</strong><br>• La carpeta <code>C:\Windows\System32</code> contiene archivos para sistemas de <strong>64 bits</strong> (Microsoft mantuvo el nombre por compatibilidad con programas antiguos).<br>• La carpeta <code>C:\Windows\SysWOW64</code> contiene los archivos de <strong>32 bits</strong> (Significa "Windows 32-bit On Windows 64-bit").</div></div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Ficheros", titulo: "Unidades unificadas (PSDrive)", html: r`
<div class="note">A diferencia del CMD clásico que solo veía discos físicos (C:, D:), PowerShell unifica el acceso a todo el sistema a través de "Unidades Virtuales". (Nota: <code>C:\</code> es la raíz del disco; Windows está en <code>C:\Windows</code>).</div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Ficheros", titulo: "El salvavidas -WhatIf", html: r`
<div class="callout ct"><span class="ci2">🦺</span><div><strong>El Salvavidas (-WhatIf):</strong> PowerShell incluye el parámetro <code>-WhatIf</code> que te dice exactamente qué pasaría si ejecutas un comando destructivo, pero <strong>sin llegar a borrar nada de verdad</strong>. (Ej: <code>Remove-Item .\sistema -Recurse -WhatIf</code>).</div></div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Ficheros", titulo: "Atributos de archivos", html: r`
<div class="note">Los atributos base de archivos en Windows son: <strong>a</strong> (Archivo), <strong>d</strong> (Directory), <strong>h</strong> (Hidden/Oculto), <strong>r</strong> (ReadOnly/Solo lectura), <strong>s</strong> (System/Sistema).</div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Alias y perfil", titulo: "Alias permanentes ($PROFILE)", html: r`
<div class="callout ci"><span class="ci2">⚙️</span><div><strong>Hacer los Alias Permanentes ($PROFILE):</strong><br>Usa <code>notepad $PROFILE</code> (o nano) para abrir el archivo de configuración base de tu usuario. Escribe dentro tus <code>New-Alias</code> y guarda. Para que se apliquen sin tener que cerrar la sesión, ejecuta <code>. $PROFILE</code> (equivale a <code>source .bashrc</code> en Linux).</div></div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Objetos y filtros", titulo: "Objetos, no texto", html: r`
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>Diferencia CLAVE con Linux:</strong> En Linux, las tuberías (<code>|</code>) pasan <em>Texto Plano</em>. En PowerShell, <strong>LOS RESULTADOS NO SON TEXTO, SON OBJETOS</strong> (pasan con todas sus propiedades matemáticas como Tamaño, Fecha, etc. intactas).</div></div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Software", titulo: "Instalación clásica (.msi / .exe)", html: r`
<div class="note">Muchos programas aún se distribuyen directamente desde la web. Para automatizar su descarga e instalación en un servidor, usamos <code>curl.exe</code> y <code>msiexec</code> (un .msi se puede instalar sin preguntas).</div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Software", titulo: "Winget", html: r`
<div class="note">Herramienta de software nativa. Su repositorio guarda "manifiestos" con la dirección del instalador oficial. Ideal para instalar software común como navegadores.</div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Software", titulo: "Chocolatey", html: r`
<div class="note">Gestor comunitario hiper-robusto externo (parecido a apt de Linux). Es el estándar de facto para automatizar tareas e instalaciones en Windows Server.</div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Usuarios y permisos", titulo: "Permisos NTFS vs compartidos", html: r`
<div class="note"><strong>Permisos NTFS:</strong> Son las listas de control de acceso (ACL) del propio sistema de ficheros. Se aplican SIEMPRE, tanto si el usuario se sienta físicamente en el servidor, como si entra por red.<br><strong>Permisos Compartidos:</strong> Solo entran en juego cuando se accede a la carpeta a través de la Red (vía <code>\\Servidor\Recurso</code>). Si accedes en local, no sirven de nada. Por red se aplican los dos y <strong>manda el más restrictivo</strong>.</div>
<div class="callout ce"><span class="ci2">🎓</span><div><strong>PREGUNTA DE EXAMEN: Permisos y RDP (Escritorio Remoto)</strong><br>¿Si Heidi entra a Windows Server usando Escritorio Remoto (RDP), se le aplican los permisos NTFS o los Compartidos de red?<br><br><strong>Respuesta: SOLO LOS NTFS.</strong> Aunque te conectes desde otro PC, una conexión RDP inicia sesión <em>dentro</em> del servidor, como si estuvieras sentado físicamente delante de él. No estás cruzando una ruta de red compartida (UNC).</div></div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Usuarios y permisos", titulo: "La regla de oro de los permisos", html: r`
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>El Denegado gana al Permitido (Deny > Allow), al mismo nivel:</strong><br>Cuando Windows evalúa si Pedro puede abrir una carpeta, hace esto:<br>1. Suma todos los permisos <em>Allow</em> que tiene Pedro como usuario.<br>2. Suma todos los permisos <em>Allow</em> de los grupos a los que pertenece Pedro.<br>3. <strong>Si existe un <em>Deny (Denegar)</em> al mismo nivel, gana al Allow.</strong><br>4. <strong>Ojo, lo explícito gana a lo heredado:</strong> Deny explícito > Allow explícito > Deny heredado > Allow heredado. Un Allow puesto en la propia carpeta gana a un Deny heredado de la carpeta padre.</div></div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Redes", titulo: "El problema del ping y el firewall", html: r`
<div class="callout ce"><span class="ci2">🛡️</span><div><strong>El Ping está bloqueado por defecto:</strong><br>El Firewall de Windows Server bloquea las solicitudes de ping (ICMP) por seguridad. Por mucho que pruebes conexión con una dirección haciendo <code>ping x</code>, si el firewall no está bajado o no tiene regla, fallará.</div></div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "SSH y copia remota", titulo: "OpenSSH en Windows Server", html: r`
<div class="note">En servidores modernos Server Core, <strong>OpenSSH</strong> ya viene soportado, permitiendo administrar Windows exactamente igual que Linux desde una terminal cifrada.</div>
` },

  { asig: "GBD", seccion: "Elementos de las BD", tema: "Conceptos", titulo: "Bases de datos vs ficheros", html: r`
<div class="note">Queremos guardar los datos de los <strong>alumnos de un instituto</strong>, así como las asignaturas de las que están matriculados y las notas que han obtenido. Este mismo problema se ha resuelto de forma diferente a lo largo de la historia:</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">Años 60</div><div class="ic-val">📝 Papel y boli</div><div class="ic-sub">Una ficha por alumno.</div></div>
<div class="ic"><div class="ic-lbl">Años 70-80</div><div class="ic-val">📄 Ficheros de texto</div><div class="ic-sub">Ficheros individuales, datos repetidos.</div></div>
<div class="ic"><div class="ic-lbl">Años 90 →</div><div class="ic-val">🗄️ Bases de Datos</div><div class="ic-sub">Un SGBD relacional elimina la redundancia.</div></div>
</div>
` },

  { asig: "GBD", seccion: "Elementos de las BD", tema: "Conceptos", titulo: "Arquitectura en niveles ANSI/SPARC", html: r`
<div class="note">
El comité ANSI/SPARC definió una arquitectura estándar para los SGBD con <strong>tres niveles independientes</strong>. Su objetivo es separar cómo se ven los datos, cómo están organizados lógicamente y cómo están almacenados físicamente.
</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">Nivel Externo o de Visión</div><div class="ic-val">👤 Lo que ve el usuario</div><div class="ic-sub">Vistas: cada cual ve su parte.</div></div>
<div class="ic"><div class="ic-lbl">Nivel Conceptual</div><div class="ic-val">🧠 Tablas y relaciones</div><div class="ic-sub">Tablas y atributos. El que conocen los programadores.</div></div>
<div class="ic"><div class="ic-lbl">Nivel Interno o Físico</div><div class="ic-val">💾 Discos y ficheros</div><div class="ic-sub">Nivel de administradores (DBA).</div></div>
</div>
` },

  { asig: "GBD", seccion: "Modelos lógicos", tema: "Modelo E/R", titulo: "El modelo Entidad/Relación", html: r`
<div class="note">
Definido por Peter Chen en 1976. El modelo entidad-relación es una técnica de <strong>representación gráfica</strong> que recoge los datos y las relaciones entre ellos, dando una visión abstracta del mundo real.
</div>
<table class="dt">
<tr><th>E/R</th><th>Modelo Relacional</th></tr>
<tr><td>Entidad</td><td>Tabla</td></tr>
<tr><td>Atributo</td><td>Campo (columna)</td></tr>
<tr><td>Ocurrencia</td><td>Fila (tupla)</td></tr>
<tr><td>Identificador</td><td>Clave Primaria (PK)</td></tr>
</table>
` },

  { asig: "GBD", seccion: "Diseño físico (DDL)", tema: "Tablas", titulo: "Diseño físico (DDL)", html: r`
<div class="note">Comandos esenciales: <code>CREATE TABLE</code>, <code>ALTER TABLE</code>, <code>DROP TABLE</code>. Uso de Constraints para integridad de dominio y referencial.</div>
` },

  { asig: "GBD", seccion: "Consultas", tema: "SELECT básico", titulo: "Proyección y selección", html: r`
<div class="note">
La sentencia <code>SELECT</code> se emplea para recuperar datos. Las operaciones principales son la <strong>Proyección</strong> (seleccionar columnas) y la <strong>Selección</strong> (filtrar filas mediante <code>WHERE</code>).
</div>
` },

  { asig: "GBD", seccion: "Modificación (DML)", tema: "INSERT", titulo: "Inserción de registros", html: r`
<div class="note">Para añadir nuevas filas a una tabla se emplea la orden <code>INSERT INTO ... VALUES</code>. Los valores deben corresponder con el tipo de dato de la columna.
</div>
` },

  { asig: "GBD", seccion: "Modificación (DML)", tema: "INSERT", titulo: "INSERT con SELECT", html: r`
<div class="note">
Permite insertar en una tabla un conjunto masivo de datos provenientes de otra tabla o consulta. Muy útil para hacer copias de seguridad, históricos o poblar tablas intermedias.
</div>
` },

  { asig: "GBD", seccion: "Modificación (DML)", tema: "UPDATE", titulo: "Modificación de registros", html: r`
<div class="note">
Para actualizar valores de filas que <strong>ya existen</strong> en la base de datos se usa <code>UPDATE ... SET</code>.
</div>
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>REGLA DE ORO:</strong> Si se omite la cláusula <code>WHERE</code>, se actualizarán <strong>TODAS</strong> las filas de la tabla. ¡Cuidado con esto en producción!</div></div>
` },

  { asig: "GBD", seccion: "Modificación (DML)", tema: "UPDATE", titulo: "Actualización con subconsultas", html: r`
<div class="note">
Puedes usar subconsultas tanto en el lado derecho del <code>SET</code> (para calcular el nuevo valor) como en la cláusula <code>WHERE</code> (para localizar a quién actualizar).
</div>
` },

  { asig: "GBD", seccion: "Modificación (DML)", tema: "DELETE", titulo: "Borrado de registros", html: r`
<div class="note">
Para eliminar filas completas de una tabla se utiliza <code>DELETE FROM</code>. No se pueden borrar columnas específicas con DELETE (eso sería un <code>UPDATE ... SET col = NULL</code> o un <code>ALTER TABLE DROP COLUMN</code>).
</div>
<div class="callout td"><span class="ci2">🔥</span><div><strong>¡PELIGRO!</strong> <code>DELETE FROM emp;</code> sin <code>WHERE</code> borrará absolutamente <strong>todos los empleados</strong> de la tabla. Para vaciar una tabla es más eficiente <code>TRUNCATE TABLE emp;</code>, pero es DDL: hace <strong>COMMIT implícito y no se puede deshacer con ROLLBACK</strong>. En MySQL además reinicia los autoincrementales (en Oracle no).</div></div>
` },

  { asig: "GBD", seccion: "Modificación (DML)", tema: "Transacciones", titulo: "Control de transacciones (ACID)", html: r`
<div class="note">Una <strong>transacción</strong> es una secuencia de una o más sentencias SQL que, juntas, forman una unidad lógica de trabajo. Garantizan la <strong>Atomicidad</strong>: o se ejecutan todas con éxito, o no se ejecuta ninguna.
</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">COMMIT</div><div class="ic-val">✅ Validar y Guardar</div><div class="ic-sub">Consolida y guarda en disco de forma permanente todas las operaciones DML realizadas desde que inició la transacción.</div></div>
<div class="ic"><div class="ic-lbl">ROLLBACK</div><div class="ic-val">⏪ Deshacer</div><div class="ic-sub">Aborta la transacción, deshaciendo todos los INSERT, UPDATE y DELETE y volviendo al estado del último COMMIT.</div></div>
</div>
` },

  { asig: "GBD", seccion: "Modificación (DML)", tema: "Transacciones", titulo: "AUTOCOMMIT y commits implícitos", html: r`
<div class="note">
<strong>AUTOCOMMIT:</strong> En MySQL viene activado; en Oracle (SQL*Plus), no. Si está en ON, cada sentencia <code>UPDATE</code> o <code>INSERT</code> se guarda instantáneamente.<br><br>
<strong>Commits Implícitos:</strong> Hay órdenes en SQL que fuerzan el guardado automático de todo lo que tengas pendiente de hacer commit:
</div>
<table class="dt">
<tr><th>Causa del Commit Implícito</th><th>Ejemplos de Comandos</th></tr>
<tr><td>Cierre normal de sesión (Oracle; en MySQL se deshace)</td><td><code>QUIT</code>, <code>EXIT</code>, <code>DISCONNECT</code></td></tr>
<tr><td>Sentencias DDL</td><td><code>CREATE TABLE</code>, <code>ALTER TABLE</code>, <code>DROP TABLE</code>, <code>TRUNCATE TABLE</code>, <code>CREATE VIEW</code></td></tr>
<tr><td>Sentencias de control (DCL)</td><td><code>GRANT</code>, <code>REVOKE</code></td></tr>
</table>
<div class="callout ci"><span class="ci2">💡</span><div><strong>¡OJO AL DATO!</strong> Si haces un montón de <code>INSERT</code> (sin commit) y luego se te ocurre hacer un <code>CREATE TABLE</code>, la creación de la tabla forzará un <strong>COMMIT implícito</strong> y ya no podrás hacer <code>ROLLBACK</code> de tus inserciones.</div></div>
` },

  { asig: "GBD", seccion: "Modificación (DML)", tema: "Errores comunes", titulo: "Integridad y restricciones", html: r`
<div class="note">Durante las inserciones y modificaciones puedes encontrarte con errores del SGBD causados por las restricciones creadas en la Unidad 3:
</div>
<table class="dt">
<tr><th>Situación / Error</th><th>Causa / Explicación del sistema</th></tr>
<tr><td>Insertar cadena que supera el límite</td><td>Si un <code>VARCHAR2(15)</code> recibe 'Gargantilla del Lozoya', el sistema rechazará el <code>INSERT</code> por desbordamiento de tamaño.</td></tr>
<tr><td>Foreign Key Constraint Violation</td><td>Ocurre al intentar borrar un departamento que aún tiene empleados dentro. Solución: Borrar primero los empleados (o usar <code>ON DELETE CASCADE</code>).</td></tr>
<tr><td>Unique / Primary Key Constraint</td><td>Ocurre al intentar insertar un <code>ID</code> (ej: id_empleado 1001) que ya existe en la base de datos.</td></tr>
</table>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Modelo OSI", titulo: "Las siete capas y su PDU", html: r`
<table>
<tr><th>Capa</th><th>Qué hace</th><th>Unidad (PDU)</th></tr>
<tr><td>7 Aplicación</td><td>Lo que usa la persona: web, correo, DNS</td><td>Datos</td></tr>
<tr><td>6 Presentación</td><td>Traduce, comprime y cifra</td><td>Datos</td></tr>
<tr><td>5 Sesión</td><td>Organiza y sincroniza el diálogo</td><td>Datos</td></tr>
<tr><td>4 Transporte</td><td>Extremo a extremo: TCP y UDP, puertos, errores</td><td>Segmento / datagrama</td></tr>
<tr><td>3 Red</td><td>Direcciones IP y encaminamiento (routers)</td><td>Paquete</td></tr>
<tr><td>2 Enlace</td><td>Tramas dentro de la misma red, MAC (switches)</td><td>Trama</td></tr>
<tr><td>1 Física</td><td>Bits por el cable o el aire</td><td>Bits</td></tr>
</table><div class="note"><strong>Encapsulación:</strong> al enviar, cada capa añade su cabecera; al recibir, cada una quita la suya. <strong>Interfaz:</strong> comunica dos capas del mismo equipo. <strong>Protocolo:</strong> normas entre la misma capa de dos equipos.</div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Subredes", titulo: "Máscaras, hosts y wildcard", html: r`
<table>
<tr><th>Prefijo</th><th>Máscara</th><th>Wildcard (OSPF)</th><th>Hosts</th><th>Salto</th></tr>
<tr><td>/24</td><td>255.255.255.0</td><td>0.0.0.255</td><td>254</td><td>256</td></tr>
<tr><td>/25</td><td>255.255.255.128</td><td>0.0.0.127</td><td>126</td><td>128</td></tr>
<tr><td>/26</td><td>255.255.255.192</td><td>0.0.0.63</td><td>62</td><td>64</td></tr>
<tr><td>/27</td><td>255.255.255.224</td><td>0.0.0.31</td><td>30</td><td>32</td></tr>
<tr><td>/28</td><td>255.255.255.240</td><td>0.0.0.15</td><td>14</td><td>16</td></tr>
<tr><td>/29</td><td>255.255.255.248</td><td>0.0.0.7</td><td>6</td><td>8</td></tr>
<tr><td>/30</td><td>255.255.255.252</td><td>0.0.0.3</td><td>2 (enlaces entre routers)</td><td>4</td></tr>
</table><div class="note"><strong>Hosts</strong> = 2<sup>bits de host</sup> − 2 (red y difusión). <strong>Salto</strong> = 256 − último número de la máscara. <strong>Wildcard</strong> = 255 − cada número de la máscara.</div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Subredes", titulo: "VLSM paso a paso", html: r`
<div class="note">1. Ordena las redes de <strong>más a menos hosts</strong>. Los enlaces entre routers (2 hosts) van al final.<br>2. Para cada una, suma 2 y busca la potencia de 2 igual o mayor: ese es el bloque.<br>3. Saca el prefijo: bloque 64 es /26, 32 es /27, 16 es /28, 8 es /29 y 4 es /30.<br>4. Asigna seguidas, empezando cada red donde acaba la anterior.<br>5. Apunta red, primera, última y difusión de cada una.</div>
` },

  { asig: "PAR", seccion: "Routers", tema: "Interfaces", titulo: "Memorias y arranque del router", html: r`
<table>
<tr><th>Memoria</th><th>Qué guarda</th></tr>
<tr><td>RAM</td><td>Configuración en uso (<code>running-config</code>) y tabla de rutas. Se pierde al apagar.</td></tr>
<tr><td>NVRAM</td><td>Configuración guardada (<code>startup-config</code>).</td></tr>
<tr><td>Flash</td><td>El sistema operativo (IOS).</td></tr>
<tr><td>ROM</td><td>Arranque y diagnóstico.</td></tr>
</table><div class="note"><strong>Arranque:</strong> prueba del hardware (POST), cargador (bootstrap), IOS y configuración guardada. Si no hay, entra en modo Setup.</div>
` },

  { asig: "PAR", seccion: "Enrutamiento", tema: "Estático y por defecto", titulo: "Cómo elige el router una ruta", html: r`
<div class="note">1. Gana la ruta con el <strong>prefijo más largo</strong> que encaje con el destino.<br>2. A igual prefijo, la de menor <strong>distancia administrativa</strong>.<br>3. A igual distancia, la de menor <strong>métrica</strong>. Si empatan, reparte la carga.</div><table>
<tr><th>Origen</th><th>Letra</th><th>Distancia</th></tr>
<tr><td>Conectada</td><td>C</td><td>0</td></tr>
<tr><td>Estática</td><td>S</td><td>1</td></tr>
<tr><td>eBGP</td><td>B</td><td>20</td></tr>
<tr><td>OSPF</td><td>O</td><td>110</td></tr>
<tr><td>RIP</td><td>R</td><td>120</td></tr>
<tr><td>iBGP</td><td>B</td><td>200</td></tr>
</table><div class="callout cw"><span class="ci2">⚠️</span><div>De un router a otro <strong>las IP no cambian</strong> y <strong>las MAC sí</strong>. El TTL baja uno en cada salto; a cero, se descarta. La tabla sabe cómo ir, no cómo volver.</div></div>
` },

  { asig: "PAR", seccion: "Enrutamiento", tema: "OSPF", titulo: "OSPF: identificador, coste y paquetes", html: r`
<div class="note"><strong>Router ID:</strong> el de <code>router-id</code>; si no, la IP más alta de las loopback; si no, la más alta de las interfaces activas.<br><strong>Coste</strong> = 100 Mbps / ancho de banda. Menos es mejor, y se suma en todo el camino.<br><strong>Número de proceso:</strong> es local, no tiene que coincidir. El <strong>área</strong> sí.<br><strong>DR y BDR:</strong> en redes con varios routers, uno centraliza las actualizaciones y otro queda de reserva.<br><strong>Paquetes:</strong> saludo, descripción de la base de datos (DBD), petición (LSR), actualización (LSU) y confirmación (LSAck).<br><strong>Muerto</strong> = 4 veces el intervalo de saludo.</div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "RAID", titulo: "Niveles de RAID", html: r`
<table>
<tr><th>Nivel</th><th>Cómo</th><th>Discos</th><th>Aguanta</th></tr>
<tr><td>RAID 0</td><td>Reparte los datos: rápido</td><td>2 o más</td><td>Ningún fallo</td></tr>
<tr><td>RAID 1</td><td>Copia idéntica (espejo)</td><td>2 o más</td><td>Todos menos uno</td></tr>
<tr><td>RAID 5</td><td>Reparte con paridad</td><td>3 o más</td><td>Un disco</td></tr>
<tr><td>RAID 10</td><td>Espejos repartidos</td><td>4 o más</td><td>Uno por cada espejo</td></tr>
</table><div class="callout cw"><span class="ci2">⚠️</span><div>Un RAID <strong>no es una copia de seguridad</strong>: si borras un archivo, se borra en todos. Para montarlo siempre, usa su UUID (<code>blkid /dev/md1</code>) en <code>/etc/fstab</code>.</div></div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "Hardware y módulos", titulo: "Instalar un controlador en Linux", html: r`
<div class="note">1. Identifica el dispositivo: <code>lspci -k</code> o <code>lsusb</code>.<br>2. Mira si sale <em>Kernel driver in use</em>. Si sale, ya funciona.<br>3. Si no, busca el paquete en los repositorios; si no está, en la web del fabricante.<br><br>El <strong>initramfs</strong> es un sistema mínimo que se carga con el núcleo al arrancar, con los módulos necesarios para poder montar la raíz.</div>
` },

  { asig: "ISO", seccion: "Linux avanzado", tema: "Samba", titulo: "¿Samba o NFS?", html: r`
<div class="note"><strong>Samba</strong> (protocolo SMB): redes mezcladas, con Windows. Pide usuario y contraseña propios.<br><strong>NFS:</strong> redes solo Linux o Unix. Se fía de la IP y del UID del cliente.<br>En los dos mandan los permisos de la carpeta en Linux.</div>
` },

  { asig: "ISO", seccion: "Dominios Windows y Linux", tema: "Active Directory", titulo: "Montar un dominio, paso a paso", html: r`
<div class="note">1. Servidor con nombre definitivo e <strong>IP fija</strong>, y como DNS él mismo.<br>2. Instalar el rol de Active Directory y promocionarlo a controlador de dominio.<br>3. En el cliente, poner como DNS la IP del servidor y unirlo al dominio.<br>4. Crear las <strong>OU</strong> (una por departamento) y los usuarios dentro.<br>5. Crear <strong>grupos globales</strong> y meter a los usuarios.<br>6. Compartir carpetas y dar permiso <strong>a los grupos</strong>, no a los usuarios.<br>7. En el NTFS, quitar la herencia y dejar solo a quien toque.<br>8. Comprobar entrando con <code>usuario@dominio</code> desde el cliente.</div>
` },

  { asig: "ISO", seccion: "Dominios Windows y Linux", tema: "Directivas de grupo (GPO)", titulo: "No se aplica la GPO: qué mirar", html: r`
<div class="note">1. <code>gpupdate /force</code> en el cliente y reiniciar.<br>2. <code>gpresult /r /scope computer</code> como administrador: ¿sale en la lista?<br>3. Mira dónde está el equipo. <strong>Computers es un contenedor, no una OU</strong>: las GPO de tus OU no le llegan. Crea una OU de equipos, muévelo y vincula ahí la GPO.<br>4. Las de <strong>equipo</strong> van en la OU del equipo y las de <strong>usuario</strong> en la del usuario.<br>5. El instalador <code>.msi</code> o el fondo tienen que estar en una <strong>ruta de red</strong> (<code>\\servidor\recurso</code>), no en <code>D:\</code>, y con permiso de lectura.<br>6. ¿Choca con otra GPO? Deshabilita su vínculo un momento y prueba.<br>7. Visor de eventos del cliente, Registros de Windows, Sistema.</div>
` },

  { asig: "ISO", seccion: "Dominios Windows y Linux", tema: "Directivas de grupo (GPO)", titulo: "Redirección de carpetas o perfil móvil", html: r`
<div class="note">Para que cada usuario tenga sus documentos en cualquier equipo, mejor <strong>redirigir carpetas</strong> que un perfil móvil, que copia todo en cada inicio y es lento.<br>Carpeta compartida en el servidor, con la enumeración basada en el acceso activada (cada uno ve solo lo suyo) y sin herencia. La GPO va en la OU de los usuarios.</div>
` },

  { asig: "ISO", seccion: "PowerShell básico", tema: "Usuarios y permisos", titulo: "Herencia de permisos", html: r`
<div class="note">Una carpeta hereda los permisos de la que la contiene. Al romper la herencia puedes <strong>conservarlos como propios</strong> (no cambia nada) o <strong>quitarlos</strong>. A partir de ahí, los cambios de arriba ya no le afectan.<br>No confundas permisos (quién puede) con atributos (oculto, solo lectura…).</div>
` },

  { asig: "GBD", seccion: "Seguridad de datos", tema: "Copias de seguridad", titulo: "Exportar e importar con SQL Developer", html: r`
<div class="note"><strong>Solo estructura:</strong> herramienta de exportar base de datos, desmarca «Exportar datos» y elige tablas, vistas y restricciones.<br><strong>Solo datos:</strong> desmarca «Exportar DDL» y selecciona las tablas.<br><strong>Las dos cosas:</strong> deja marcadas ambas.<br><strong>Restaurar:</strong> abre el <code>.sql</code>, elige la conexión arriba a la derecha y ejecútalo entero.<br>Con Oracle en Docker se usa esta vía gráfica; las herramientas de terminal hay que lanzarlas dentro del contenedor.</div>
` },

  { asig: "FH", seccion: "Componentes", tema: "Memoria RAM", titulo: "Parámetros de la RAM", html: r`
<table>
<tr><th>Parámetro</th><th>Qué es</th></tr>
<tr><td>Velocidad</td><td>Transferencias por segundo (MT/s), lo que se anuncia como MHz</td></tr>
<tr><td>Ancho del bus</td><td>64 bits = 8 bytes por módulo</td></tr>
<tr><td>Latencia (CL)</td><td>Ciclos de espera. Menos es mejor, <strong>a igual velocidad</strong></td></tr>
<tr><td>ECC</td><td>Detecta y corrige errores: para servidores</td></tr>
<tr><td>Registered (buffered)</td><td>Más estable, algo más lenta y cara: servidores</td></tr>
<tr><td>XMP / EXPO</td><td>Perfil para pasar de la velocidad básica; se activa en la UEFI</td></tr>
</table><div class="note"><strong>Velocidad de transferencia</strong> = velocidad (MT/s) × 8 bytes. DDR4-3200: 3200 × 8 = <strong>25.600 MB/s</strong>.<br><strong>Dual channel:</strong> dos módulos iguales en las ranuras que diga la placa (suelen ser 2 y 4); dobla el ancho a 128 bits.<br>Si mezclas velocidades, todos van a la del más lento. DDR4 y DDR5 no son compatibles: la muesca está en otro sitio.</div>
` },

  { asig: "FH", seccion: "Componentes", tema: "BIOS y UEFI", titulo: "BIOS y UEFI: diferencias", html: r`
<table>
<tr><th></th><th>BIOS</th><th>UEFI</th></tr>
<tr><td>Discos</td><td>MBR</td><td>GPT (y MBR en modo Legacy)</td></tr>
<tr><td>Interfaz</td><td>Texto y teclado</td><td>Gráfica y ratón</td></tr>
<tr><td>Arranque</td><td>Más lento</td><td>Más rápido, 64 bits</td></tr>
<tr><td>Seguridad</td><td>—</td><td>Secure Boot</td></tr>
</table><div class="note"><strong>POST:</strong> comprobación del hardware al encender; si hay un fallo grave, avisa con pitidos y no sigue.<br><strong>Arranque:</strong> POST, buscar dispositivo, gestor de arranque, sistema operativo.<br><strong>Secure Boot:</strong> solo arranca sistemas firmados. Las distribuciones principales lo están; si la tuya no, hay que desactivarlo.<br><strong>Pila agotada:</strong> se pierden la fecha y la configuración.</div>
` },

  { asig: "FH", seccion: "CPD y servidores", tema: "SAI", titulo: "Tipos de SAI y potencia", html: r`
<table>
<tr><th>Tipo</th><th>Cómo funciona</th><th>Para qué</th></tr>
<tr><td>Off-line (stand-by)</td><td>Solo actúa cuando falla la luz</td><td>PC de casa</td></tr>
<tr><td>In-line (interactivo)</td><td>Además corrige tensiones altas o bajas; corte de 2 a 10 ms</td><td>Oficina</td></tr>
<tr><td>On-line</td><td>Genera siempre corriente limpia; sin corte</td><td>Servidores</td></tr>
</table><div class="note"><strong>Factor de potencia</strong> = W / VA, y por eso VA ≥ W. Si no lo dicen, se supone <strong>0,7</strong>.<br><strong>W = VA × FP</strong>. Un SAI de 1000 VA da unos 700 W. Para saber qué SAI necesitas: <strong>VA = W / FP</strong>.</div>
` },

  { asig: "FH", seccion: "CPD y servidores", tema: "CPD", titulo: "Qué tiene un CPD", html: r`
<div class="note"><strong>Control de acceso:</strong> cerradura, tarjeta o biometría.<br><strong>Rack:</strong> se mide en U. 1 U = 1,75 pulgadas = <strong>4,445 cm</strong>. Lo normal, 19 pulgadas de ancho.<br><strong>Temperatura:</strong> entre 21 y 23 ºC, con <strong>pasillos fríos y calientes</strong> alternos.<br><strong>Electricidad y datos:</strong> líneas redundantes, SAI y cableado por el falso suelo.<br><strong>Incendios:</strong> ni agua ni polvo; gases que desplazan el oxígeno por inundación total. ⚠️ Hay que evacuar antes de la descarga.</div>
` },

  { asig: "FH", seccion: "CPD y servidores", tema: "Servidores", titulo: "Elegir un servidor", html: r`
<table>
<tr><th>Formato</th><th>Cuándo</th></tr>
<tr><td>Torre</td><td>Pocos equipos, sin armario</td></tr>
<tr><td>Rack</td><td>Varios servidores en un armario</td></tr>
<tr><td>Blade</td><td>Muchos en poco espacio, comparten chasis y alimentación</td></tr>
</table><div class="note"><strong>Qué mirar:</strong> procesadores y núcleos, RAM máxima y ECC, número y tipo de discos, cambio en caliente, controladora RAID, varias tarjetas de red, fuente redundante y garantía.<br><strong>Discos:</strong> SATA, SAS, NVMe M.2 (equipo apagado, se calienta) y NVMe U.2 (en caliente, con disipador).</div>
` },

  { asig: "FH", seccion: "CPD y servidores", tema: "RAID", titulo: "Capacidad de cada RAID", html: r`
<table>
<tr><th>RAID</th><th>Capacidad (n discos de tamaño d)</th><th>Con 4 discos de 1 TB</th></tr>
<tr><td>0</td><td>n × d</td><td>4 TB</td></tr>
<tr><td>1</td><td>d (la del más pequeño)</td><td>1 TB</td></tr>
<tr><td>5</td><td>(n − 1) × d</td><td>3 TB</td></tr>
<tr><td>5 + reserva</td><td>(n − 2) × d</td><td>2 TB</td></tr>
<tr><td>10</td><td>(n / 2) × d</td><td>2 TB</td></tr>
</table><div class="note"><strong>Por software:</strong> lo lleva el sistema operativo. <strong>Por hardware:</strong> tarjeta controladora; el sistema ve un solo disco y permite cambio en caliente. <strong>Por BIOS (híbrido):</strong> parece hardware, pero los cálculos los hace la CPU.<br>Los comandos están en ISO, Linux avanzado, RAID.</div>
` },

  { asig: "FH", seccion: "Copias y clonación", tema: "Copias de seguridad", titulo: "Total, incremental y diferencial", html: r`
<table>
<tr><th>Tipo</th><th>Qué copia</th><th>Para restaurar necesitas</th></tr>
<tr><td>Total</td><td>Todo</td><td>Solo esa</td></tr>
<tr><td>Incremental</td><td>Lo cambiado desde la última copia <strong>de cualquier tipo</strong></td><td>La total y <strong>todas</strong> las incrementales, en orden</td></tr>
<tr><td>Diferencial</td><td>Lo cambiado desde la última <strong>total</strong></td><td>La total y la <strong>última</strong> diferencial</td></tr>
</table><div class="note">La <strong>incremental</strong> es la más rápida y pequeña, pero la más lenta de restaurar. La <strong>diferencial</strong> crece cada día, pero se restaura antes.<br>Guarda siempre una copia fuera del equipo y prueba a restaurarla.</div>
` },

  { asig: "FH", seccion: "Copias y clonación", tema: "Clonación", titulo: "Imagen, clonación y multicast", html: r`
<div class="note"><strong>Imagen:</strong> archivo con el contenido y la estructura completos de un disco.<br><strong>Clonar:</strong> copiar un disco a otro, directamente o pasando por una imagen. Permite preparar muchos equipos desde uno modelo, con hardware parecido. Herramienta habitual: Clonezilla.<br><strong>Unicast:</strong> un envío por cada equipo. <strong>Broadcast:</strong> a toda la red. <strong>Multicast:</strong> un solo envío para todos los que lo piden; es el bueno para clonar un aula.</div>
` },

  { asig: "FH", seccion: "Taller", tema: "Polímetro", titulo: "Medir con el polímetro", html: r`
<table>
<tr><th>Medida</th><th>Cómo</th></tr>
<tr><td>Tensión (V)</td><td>En <strong>paralelo</strong>, tocando los dos extremos. Elige continua o alterna</td></tr>
<tr><td>Intensidad (A)</td><td>En <strong>serie</strong>: se abre el circuito y pasa por el polímetro</td></tr>
<tr><td>Resistencia (Ω)</td><td>Con el circuito <strong>sin corriente</strong></td></tr>
<tr><td>Continuidad</td><td>Pita si hay contacto: sirve para probar cables</td></tr>
<tr><td>Diodo</td><td>Unos 0,7 V si es de silicio y 0,3 V si es de germanio</td></tr>
</table><div class="note">Negro en <strong>COM</strong> y rojo en <strong>VΩmA</strong>. Empieza por la escala más alta y ve bajando. Si sale negativo, las puntas están al revés.</div><div class="callout cw"><span class="ci2">⚠️</span><div>Nunca midas resistencia ni continuidad con tensión, ni tensión en la posición de intensidad.</div></div>
` },

  { asig: "FH", seccion: "Taller", tema: "Soldadura", titulo: "Soldar bien", html: r`
<div class="note">1. Limpia las piezas y la punta.<br>2. Estaña por separado el cable y el terminal.<br>3. Calienta <strong>la patilla y la pista a la vez</strong>.<br>4. Acerca el estaño a la pieza, no al soldador, lo justo.<br>5. Retira el estaño y luego el soldador. Que no se mueva y <strong>no soples</strong>.<br>6. Tiene que quedar brillante y cóncava; si queda mate y en bola, es soldadura fría.<br><br>El soldador, siempre en su soporte. Quemadura: agua fría varios minutos.</div>
` },

  { asig: "FH", seccion: "Componentes", tema: "Arquitectura", titulo: "Von Neumann, Harvard y la CPU", html: r`
<div class="note"><strong>Von Neumann:</strong> una sola memoria para datos e instrucciones. Su problema es el cuello de botella con la memoria, que se alivia con la caché. <strong>Harvard:</strong> memorias y buses separados. Los equipos actuales son Von Neumann modificado.<br><strong>CPU:</strong> unidad de control (lee, interpreta y ordena), ALU (opera) y registros (datos inmediatos).<br><strong>Entrada y salida:</strong> <strong>PIO</strong>, la CPU espera y lo hace todo; <strong>IRQ</strong>, el dispositivo avisa a la CPU; <strong>DMA</strong>, se transfiere directamente a la memoria y la CPU se desentiende.</div>
` },

  { asig: "FH", seccion: "Componentes", tema: "Arquitectura", titulo: "Buses y jerarquía de memoria", html: r`
<table>
<tr><th>Bus</th><th>Qué lleva</th><th>Sentido</th></tr>
<tr><td>Datos</td><td>Datos e instrucciones</td><td>Dos</td></tr>
<tr><td>Direcciones</td><td>A qué posición se accede</td><td>Uno</td></tr>
<tr><td>Control</td><td>Órdenes y estado</td><td>Dos</td></tr>
</table><div class="note"><strong>Velocidad</strong> = ancho × frecuencia. 32 bits a 33 MHz: 4 bytes × 33 = <strong>132 MB/s</strong>.<br><strong>Memoria que se puede direccionar</strong> = 2<sup>líneas de direcciones</sup> posiciones. Con 32 líneas, 4 GiB.<br><strong>De más rápida a más lenta:</strong> registros, caché L1, L2, L3, RAM, SSD y disco duro. Cuanto más rápida, más pequeña y cara.</div>
` },

  { asig: "FH", seccion: "Componentes", tema: "Caja y refrigeración", titulo: "Factor de forma, aire y líquido", html: r`
<table>
<tr><th>Placa</th><th>Tamaño máximo (mm)</th><th>Ranuras</th></tr>
<tr><td>E-ATX</td><td>305 × 330</td><td>Más de 7</td></tr>
<tr><td>ATX</td><td>244 × 305</td><td>7</td></tr>
<tr><td>Micro ATX</td><td>244 × 244</td><td>4</td></tr>
<tr><td>Mini-ITX</td><td>170 × 170</td><td>1</td></tr>
</table><div class="note">Una caja admite las placas de su tamaño y las menores.<br><strong>Flujo de aire:</strong> entra frío por delante o por abajo y sale caliente por detrás y por arriba.<br><strong>Aire:</strong> barata, fácil y casi sin mantenimiento. <strong>Líquida:</strong> enfría más, pero es más cara y puede tener fugas.<br>La caja va conectada a tierra a través de la fuente.</div>
` },

  { asig: "FH", seccion: "Componentes", tema: "Placa base", titulo: "Conectores y zócalos", html: r`
<table>
<tr><th>Conector</th><th>Para qué</th></tr>
<tr><td>ATX de 24 pines</td><td>Alimentación principal</td></tr>
<tr><td>ATX 12 V (4 u 8 pines)</td><td>Alimentación del procesador</td></tr>
<tr><td>CPU_FAN, SYS_FAN o CHA_FAN</td><td>Ventiladores. 3 pines: leen la velocidad. 4 pines: además la regulan (PWM)</td></tr>
<tr><td>SATA</td><td>Discos, uno por conector, 6 Gb/s</td></tr>
<tr><td>M.2</td><td>SSD: puede ser SATA o NVMe (PCIe)</td></tr>
<tr><td>PCI Express</td><td>Tarjetas. Se mide en carriles: x1, x4, x16</td></tr>
<tr><td>TPM</td><td>Guarda claves de cifrado; Windows 11 pide la versión 2.0</td></tr>
<tr><td>F_PANEL</td><td>Botones y luces de la caja</td></tr>
</table><div class="note"><strong>Zócalo:</strong> <strong>PGA</strong>, los pines están en el procesador; <strong>LGA</strong>, en la placa; <strong>BGA</strong>, soldado, no se cambia.<br><strong>Chipset:</strong> decide qué procesadores, memoria, USB y PCIe admite la placa. El antiguo puente norte hoy está dentro del procesador.<br><strong>Discos, de forma aproximada:</strong> disco duro, 100 a 250 MB/s; SSD SATA, 550; NVMe PCIe 3.0, 3.500; PCIe 4.0, 7.000; PCIe 5.0, 14.000.</div>
` },

  { asig: "FH", seccion: "Componentes", tema: "Procesador", titulo: "En qué fijarse", html: r`
<table>
<tr><th>Dato</th><th>Qué significa</th></tr>
<tr><td>Frecuencia (GHz)</td><td>Ciclos por segundo. Solo se compara dentro de la misma gama</td></tr>
<tr><td>Núcleos e hilos</td><td>Con SMT (Hyper-Threading en Intel), cada núcleo se ve como dos</td></tr>
<tr><td>Caché</td><td>L1 y L2 en cada núcleo, L3 compartida</td></tr>
<tr><td>TDP (W)</td><td>Calor que debe poder disipar el ventilador</td></tr>
<tr><td>Proceso (nm)</td><td>Tamaño de fabricación: menor, más eficiente</td></tr>
<tr><td>Arquitectura</td><td>x86-64 (Intel y AMD) o ARM: no ejecutan los mismos programas</td></tr>
<tr><td>Instrucciones</td><td>SSE y AVX aceleran cálculos; AES, el cifrado</td></tr>
<tr><td>Virtualización</td><td>VT-x (Intel) o AMD-V: se activa en la UEFI</td></tr>
<tr><td>GPU integrada</td><td>Si no la tiene, hace falta tarjeta gráfica</td></tr>
</table>
` },

  { asig: "FH", seccion: "Componentes", tema: "Fuente de alimentación", titulo: "Tensiones, colores y conectores", html: r`
<table>
<tr><th>Color</th><th>Qué es</th></tr>
<tr><td>Amarillo</td><td>+12 V</td></tr>
<tr><td>Rojo</td><td>+5 V</td></tr>
<tr><td>Naranja</td><td>+3,3 V</td></tr>
<tr><td>Negro</td><td>Masa</td></tr>
<tr><td>Azul</td><td>−12 V</td></tr>
<tr><td>Morado</td><td>+5 V en reposo (5VSB)</td></tr>
<tr><td>Verde</td><td>PS_ON: enciende la fuente</td></tr>
<tr><td>Gris</td><td>Power Good: tensiones correctas</td></tr>
</table><div class="note"><strong>Tolerancia:</strong> ±5 %. Los 12 V, entre 11,4 y 12,6; los 5 V, entre 4,75 y 5,25; los 3,3 V, entre 3,14 y 3,47.<br><strong>PCIe:</strong> la ranura da 75 W, el conector de 6 pines otros 75 y el de 8 pines 150.<br><strong>PFC:</strong> corrige el desfase y hace que pida menos corriente a la red. El activo es mejor que el pasivo.<br><strong>Formatos:</strong> ATX, SFX (compacto) y TFX (alargado). <strong>Modular:</strong> se ponen solo los cables necesarios. <strong>MTBF:</strong> horas medias entre averías.</div><table>
<tr><th>80 PLUS</th><th>Eficiencia al 50 % de carga (115 V)</th></tr>
<tr><td>Blanco</td><td>80 %</td></tr>
<tr><td>Bronce</td><td>85 %</td></tr>
<tr><td>Plata</td><td>88 %</td></tr>
<tr><td>Oro</td><td>90 %</td></tr>
<tr><td>Platino</td><td>92 %</td></tr>
<tr><td>Titanio</td><td>94 %</td></tr>
</table>
` },

  { asig: "FH", seccion: "Taller", tema: "Fuente", titulo: "Probar una fuente fuera del equipo", html: r`
<div class="note">1. Desconéctala de la placa y de los discos.<br>2. Enchúfala y mide el <strong>morado</strong>: 5 V aunque esté apagada.<br>3. Puentea el <strong>verde con un negro</strong> (pin 14 en el conector de 20 y pin 16 en el de 24). Tiene que girar el ventilador.<br>4. Mide en continua cada color con la punta negra en un cable negro.<br>5. Con un tester es directo: además mide el tiempo de Power Good, entre 100 y 500 ms.</div><div class="callout cw"><span class="ci2">⚠️</span><div>Nunca abras la fuente: los condensadores guardan tensión aunque esté desenchufada.</div></div>
` },

  { asig: "FH", seccion: "Taller", tema: "Panel frontal", titulo: "Conectar botones y luces", html: r`
<table>
<tr><th>Conector</th><th>Qué es</th><th>¿Importa la polaridad?</th></tr>
<tr><td>POWER SW</td><td>Botón de encendido</td><td>No</td></tr>
<tr><td>RESET SW</td><td>Botón de reinicio</td><td>No</td></tr>
<tr><td>POWER LED</td><td>Luz de encendido</td><td>Sí</td></tr>
<tr><td>HDD LED</td><td>Luz del disco</td><td>Sí</td></tr>
<tr><td>SPEAKER</td><td>Altavoz de pitidos</td><td>Suele dar igual</td></tr>
</table><div class="note">El triángulo ▼ marca el pin 1 o positivo. Mira el manual: cada placa los ordena a su manera. El blanco o negro suele ser el negativo.<br>Si una luz no enciende, dale la vuelta: no se estropea.<br><strong>USB 2.0 interno:</strong> 9 pines: 5 V, D−, D+ y masa, dos veces, y uno sin usar. El pin que falta impide ponerlo al revés.</div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Tipos de redes", titulo: "Clasificación de las redes", html: r`
<div class="note"><strong>Tamaño:</strong> LAN (edificio), de campus, MAN (ciudad) y WAN (países).<br><strong>Sentido:</strong> símplex (uno), semidúplex (los dos, por turnos) y dúplex (los dos a la vez).<br><strong>Conmutación:</strong> de circuitos (camino reservado, como el teléfono clásico), de paquetes (cada trozo por su cuenta, como Internet) y de mensajes (entero, de nodo en nodo).<br><strong>Multiplexar:</strong> compartir un medio, por tiempo o por frecuencia.<br><strong>Problemas de la señal:</strong> atenuación (se debilita), diafonía (un par interfiere en otro) y ruido.</div><table>
<tr><th>Topología</th><th>A favor</th><th>En contra</th></tr>
<tr><td>Estrella</td><td>Si falla un cable, solo cae un equipo</td><td>Si falla el centro, cae todo</td></tr>
<tr><td>Bus</td><td>Poco cable</td><td>Si se corta, cae la red</td></tr>
<tr><td>Anillo</td><td>Sin colisiones</td><td>Si se corta, cae la red</td></tr>
<tr><td>Malla</td><td>Muchos caminos</td><td>Mucho cable</td></tr>
<tr><td>Árbol</td><td>Crece por niveles</td><td>Si falla una rama, cae lo que cuelga</td></tr>
<tr><td>Celular</td><td>Sin cables</td><td>Interferencias</td></tr>
</table>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Dispositivos", titulo: "Dominios de colisión y de difusión", html: r`
<table>
<tr><th>Dispositivo</th><th>Capa</th><th>Colisión</th><th>Difusión</th></tr>
<tr><td>Repetidor, hub</td><td>1</td><td>No separa</td><td>No separa</td></tr>
<tr><td>Puente, switch</td><td>2</td><td><strong>Uno por puerto</strong></td><td>No separa</td></tr>
<tr><td>Punto de acceso</td><td>2</td><td>Todo lo inalámbrico, uno</td><td>No separa</td></tr>
<tr><td>Switch con VLAN</td><td>2</td><td>Uno por puerto</td><td><strong>Uno por VLAN</strong></td></tr>
<tr><td>Router, switch de capa 3</td><td>3</td><td>Uno por puerto</td><td><strong>Uno por red</strong></td></tr>
</table><div class="note"><strong>Contar los de difusión:</strong> cuenta las redes que separan los routers. Dos routers unidos por un switch o un cable son otra.<br><strong>Contar los de colisión:</strong> cada cable que llega a un switch o router es uno; todo lo que cuelga de un hub es el mismo.<br>Con enlaces dúplex no hay colisiones reales, pero en los ejercicios se cuentan igual.<br><strong>Pasarela (gateway):</strong> une redes con protocolos distintos.</div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Subredes", titulo: "Clases y direcciones especiales", html: r`
<table>
<tr><th>Clase</th><th>Primer número</th><th>Máscara</th><th>Privadas</th></tr>
<tr><td>A</td><td>1 a 126</td><td>/8</td><td>10.0.0.0/8</td></tr>
<tr><td>B</td><td>128 a 191</td><td>/16</td><td>172.16.0.0/12</td></tr>
<tr><td>C</td><td>192 a 223</td><td>/24</td><td>192.168.0.0/16</td></tr>
<tr><td>D</td><td>224 a 239</td><td>Multidifusión</td><td>—</td></tr>
<tr><td>E</td><td>240 a 255</td><td>Experimental</td><td>—</td></tr>
</table><div class="note"><strong>127.0.0.0/8:</strong> el propio equipo. <strong>169.254.0.0/16:</strong> no ha encontrado DHCP. <strong>255.255.255.255:</strong> difusión.<br><strong>Dividir en partes iguales:</strong> n bits prestados dan 2<sup>n</sup> subredes. 192.168.1.0/24 con 2 bits son cuatro /26: .0, .64, .128 y .192.<br>Antes no se usaban la primera ni la última subred. <strong>Hoy sí</strong>.</div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Cableado", titulo: "Cables y categorías", html: r`
<table>
<tr><th>Medio</th><th>Velocidad</th><th>Distancia</th></tr>
<tr><td>Cat 5e</td><td>1 Gb/s</td><td>100 m</td></tr>
<tr><td>Cat 6</td><td>1 Gb/s (10 hasta unos 55 m)</td><td>100 m</td></tr>
<tr><td>Cat 6A</td><td>10 Gb/s</td><td>100 m</td></tr>
<tr><td>Fibra multimodo</td><td>10 Gb/s o más</td><td>Cientos de metros</td></tr>
<tr><td>Fibra monomodo</td><td>10 Gb/s o más</td><td>Kilómetros</td></tr>
</table><div class="note"><strong>UTP:</strong> sin pantalla, el normal. <strong>FTP:</strong> una lámina para todos los pares. <strong>STP:</strong> malla, para zonas con interferencias; necesita toma de tierra.<br><strong>Coaxial:</strong> conector BNC, hoy para televisión. <strong>Fibra:</strong> inmune a interferencias, conectores SC (a presión), LC (pequeño) y ST (de giro).</div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Cableado", titulo: "Orden de los hilos: T568A y T568B", html: r`
<table>
<tr><th>Pin</th><th>T568A</th><th>T568B</th></tr>
<tr><td>1</td><td>Blanco-verde</td><td>Blanco-naranja</td></tr>
<tr><td>2</td><td>Verde</td><td>Naranja</td></tr>
<tr><td>3</td><td>Blanco-naranja</td><td>Blanco-verde</td></tr>
<tr><td>4</td><td>Azul</td><td>Azul</td></tr>
<tr><td>5</td><td>Blanco-azul</td><td>Blanco-azul</td></tr>
<tr><td>6</td><td>Naranja</td><td>Verde</td></tr>
<tr><td>7</td><td>Blanco-marrón</td><td>Blanco-marrón</td></tr>
<tr><td>8</td><td>Marrón</td><td>Marrón</td></tr>
</table><div class="note"><strong>Directo:</strong> la misma norma en los dos extremos. PC con switch, switch con router.<br><strong>Cruzado:</strong> una en cada extremo. Equipos iguales: PC con PC, switch con switch, PC con router. Los equipos modernos lo detectan solos (Auto-MDIX); en Packet Tracer sí importa.<br>A 10 y 100 Mb/s se usan los pines 1, 2, 3 y 6; a <strong>1 Gb/s, los ocho</strong>.<br><strong>Hacer un latiguillo:</strong> pelar unos 2 cm, ordenar, cortar recto, meter hasta el fondo con la funda dentro del conector, crimpar y probar con el tester.</div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Cableado", titulo: "Cableado estructurado", html: r`
<table>
<tr><th>Parte</th><th>Qué es</th></tr>
<tr><td>Área de trabajo</td><td>De la roseta al equipo</td></tr>
<tr><td>Cableado horizontal</td><td>De la roseta al armario de la planta: <strong>90 m</strong>, más 10 de latiguillos</td></tr>
<tr><td>Troncal (backbone)</td><td>Une plantas y edificios, normalmente con fibra</td></tr>
<tr><td>Distribuidores</td><td>De planta, de edificio y de campus</td></tr>
<tr><td>Sala de equipos</td><td>Servidores y equipos principales</td></tr>
<tr><td>Entrada</td><td>Donde acaba el operador y empieza tu red</td></tr>
</table><div class="note"><strong>Normas:</strong> TIA-568 (Estados Unidos), ISO/IEC 11801 (internacional) y EN 50173 (Europa).<br><strong>Panel de parcheo:</strong> cada roseta acaba en él; con latiguillos se da o quita servicio.<br>Al menos un armario por planta, todo etiquetado, y los datos lejos de los cables eléctricos y motores.<br><strong>Certificar:</strong> medir cada cable (longitud, atenuación, diafonía) y comparar con la norma.</div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Transporte", titulo: "TCP, UDP y puertos", html: r`
<table>
<tr><th></th><th>TCP</th><th>UDP</th></tr>
<tr><td>Conexión</td><td>Sí</td><td>No</td></tr>
<tr><td>Fiable y en orden</td><td>Sí: secuencia, confirmación y ventana</td><td>No</td></tr>
<tr><td>Velocidad</td><td>Menor</td><td>Mayor</td></tr>
<tr><td>Cabecera</td><td>20 bytes o más</td><td>8 bytes</td></tr>
<tr><td>Lo usan</td><td>Web, correo, SSH, FTP</td><td>DNS, DHCP, TFTP, SNMP, voz, juegos</td></tr>
</table><div class="note"><strong>Abrir (<em>handshake</em> de tres pasos):</strong> SYN, SYN-ACK, ACK. <strong>Cerrar:</strong> FIN, ACK, FIN, ACK.<br><strong>Puertos:</strong> 0 a 1023, conocidos; 1024 a 49151, registrados; 49152 a 65535, dinámicos, los del cliente.<br><strong>Socket:</strong> IP y puerto, como 192.168.1.20:80. <strong>DNS</strong> usa UDP y, si la respuesta es grande, TCP.</div><table>
<tr><th>Puerto</th><th>Servicio</th><th>Puerto</th><th>Servicio</th></tr>
<tr><td>20, 21</td><td>FTP</td><td>110</td><td>POP3</td></tr>
<tr><td>22</td><td>SSH</td><td>123</td><td>NTP</td></tr>
<tr><td>23</td><td>Telnet</td><td>143</td><td>IMAP</td></tr>
<tr><td>25</td><td>SMTP</td><td>161</td><td>SNMP</td></tr>
<tr><td>53</td><td>DNS</td><td>443</td><td>HTTPS</td></tr>
<tr><td>67, 68</td><td>DHCP</td><td>445</td><td>SMB</td></tr>
<tr><td>69</td><td>TFTP</td><td>1521</td><td>Oracle</td></tr>
<tr><td>80</td><td>HTTP</td><td>3306</td><td>MySQL</td></tr>
<tr><td>88</td><td>Kerberos</td><td>3389</td><td>RDP</td></tr>
<tr><td>389</td><td>LDAP</td><td>636</td><td>LDAPS</td></tr>
</table>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "ARP", titulo: "Cómo funciona ARP y sus riesgos", html: r`
<div class="note"><strong>Para qué:</strong> saber la MAC de una IP de tu red. Si el destino está en otra red, se pregunta por la de la <strong>puerta de enlace</strong>.<br>1. Pregunta a todos (FF:FF:FF:FF:FF:FF): ¿quién tiene esta IP?<br>2. Responde solo quien la tiene, directamente.<br>3. Se guarda un tiempo en la tabla ARP.</div><div class="callout cw"><span class="ci2">⚠️</span><div>Nadie comprueba la respuesta, y por eso existe la suplantación (<em>ARP spoofing</em>), que pone a alguien en medio. <strong>Señal:</strong> con <code>arp -a</code>, la MAC de la puerta de enlace cambia o se repite en otra IP. <strong>Defensa:</strong> DHCP snooping e inspección dinámica de ARP en el switch, y protocolos cifrados (HTTPS, SSH).</div></div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Wi-Fi", titulo: "Poner un punto de acceso", html: r`
<div class="note">1. Pon el PC en la misma red que el punto de acceso y entra con el navegador en su IP.<br>2. <strong>Cambia la contraseña de administración.</strong><br>3. Nombre de la red (SSID) y <strong>WPA2 o WPA3</strong>. WEP y WPA están rotos.<br>4. Canal: en 2,4 GHz, el <strong>1, el 6 o el 11</strong>, que no se pisan.<br>5. Un solo servidor DHCP: si ya hay otro, desactiva el suyo.<br>6. Prueba desde el móvil.</div>
` },

  { asig: "PAR", seccion: "Switches", tema: "Enlaces troncales", titulo: "Qué sale al unir dos puertos (DTP)", html: r`
<table>
<tr><th></th><th>access</th><th>dynamic auto</th><th>dynamic desirable</th><th>trunk</th></tr>
<tr><td><strong>access</strong></td><td>Acceso</td><td>Acceso</td><td>Acceso</td><td><strong>Error</strong></td></tr>
<tr><td><strong>dynamic auto</strong></td><td>Acceso</td><td>Acceso</td><td>Troncal</td><td>Troncal</td></tr>
<tr><td><strong>dynamic desirable</strong></td><td>Acceso</td><td>Troncal</td><td>Troncal</td><td>Troncal</td></tr>
<tr><td><strong>trunk</strong></td><td><strong>Error</strong></td><td>Troncal</td><td>Troncal</td><td>Troncal</td></tr>
</table><div class="note">Por defecto, un 2960 está en <code>dynamic auto</code>: <strong>dos 2960 sin configurar no hacen troncal</strong>.<br>Con <code>nonegotiate</code> no se negocia: solo hace troncal con otro <code>trunk</code>.<br><strong>VLAN nativa:</strong> va sin etiqueta. Tiene que ser la misma en los dos lados, y mejor que no sea la 1.</div>
` },

  { asig: "PAR", seccion: "Switches", tema: "Switch de capa 3", titulo: "Comunicar VLAN: tres formas", html: r`
<table>
<tr><th>Forma</th><th>Cómo</th><th>Pega</th></tr>
<tr><td>Un cable por VLAN</td><td>Cada interfaz del router, en una VLAN</td><td>Gasta muchas interfaces</td></tr>
<tr><td>Router-on-a-stick</td><td>Una interfaz con subinterfaces y un troncal</td><td>Todo pasa por un cable</td></tr>
<tr><td>Switch de capa 3</td><td><code>ip routing</code> e <code>interface vlan</code></td><td>El equipo es más caro</td></tr>
</table><div class="note"><strong>No funciona, qué mirar:</strong><br>1. ¿Existe la VLAN en todos los switches? (<code>show vlan brief</code>)<br>2. ¿El puerto está en su VLAN? ¿El del router es troncal? (<code>show interfaces trunk</code>)<br>3. ¿El número de <code>encapsulation dot1Q</code> es el de la VLAN?<br>4. ¿IP y máscara correctas, y la interfaz levantada? (<code>show ip interface brief</code>)<br>5. En capa 3, ¿está <code>ip routing</code>?<br>6. ¿La puerta de enlace del PC es la de <strong>su</strong> VLAN?<br><br><strong>Switch de capa 3 o router:</strong> el switch tiene muchos puertos y es más rápido, dentro de la organización. El router tiene pocos, pero con enlaces WAN y BGP, hacia fuera.</div>
` },

  { asig: "GBD", seccion: "Elementos de las BD", tema: "Conceptos", titulo: "Componentes de un SGBD", html: r`
<table>
<tr><th>Parte</th><th>Qué hace</th></tr>
<tr><td>DDL</td><td>Crea la estructura: <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code></td></tr>
<tr><td>DML</td><td>Consulta y cambia datos: <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></td></tr>
<tr><td>DCL</td><td>Permisos: <code>GRANT</code>, <code>REVOKE</code></td></tr>
<tr><td>Diccionario de datos</td><td>Datos sobre los datos: tablas, restricciones, usuarios</td></tr>
<tr><td>Seguridad e integridad</td><td>Copias, accesos, restricciones, concurrencia</td></tr>
<tr><td>Personas</td><td>Usuarios finales, programadores y administradores (DBA)</td></tr>
</table><div class="note"><strong>Objetivos:</strong> consultas libres, independencia de los datos, poca redundancia, integridad, varios usuarios a la vez y seguridad.<br><strong>Redundancia:</strong> el mismo dato repetido. <strong>Inconsistencia:</strong> el repetido no coincide.<br><strong>Independencia lógica:</strong> cambiar tablas sin rehacer los programas. <strong>Física:</strong> mover los archivos sin que se note.<br><strong>Explotación:</strong> monopuesto, cliente/servidor, en rejilla (varias máquinas como una), distribuida (varios servidores independientes) y por capas.</div>
` },

  { asig: "GBD", seccion: "Modelos lógicos", tema: "Modelo E/R", titulo: "Participación, cardinalidad y grado", html: r`
<div class="note"><strong>Participación:</strong> mínimo y máximo. Fija <strong>una</strong> ocurrencia de un lado y cuenta cuántas le tocan del otro: (0,1), (1,1), (0,n) o (1,n). Se escribe en el lado contado.<br><strong>Cardinalidad:</strong> los dos máximos juntos: 1:1, 1:N o N:M.<br><strong>Grado:</strong> cuántas entidades une: 1 (reflexiva), 2 (binaria), 3 (ternaria).<br><strong>Atributos de la relación:</strong> los que dependen de las dos entidades, como la fecha de una compra. A veces entran en la clave: si un cliente puede comprar lo mismo otro día, la fecha forma parte de ella.</div>
` },

  { asig: "GBD", seccion: "Modelos lógicos", tema: "Modelo E/R", titulo: "Entidades débiles y redundancia", html: r`
<div class="note"><strong>Fuerte:</strong> existe por sí sola. <strong>Débil:</strong> depende de otra; se dibuja con doble rectángulo.<br><strong>Dependencia de existencia (E):</strong> sin la otra no existe, pero tiene clave propia. <strong>De identificación (I):</strong> además necesita la clave de la otra. Ejemplo: la sala 3 de un cine.<br><strong>Redundancia:</strong> sobra una relación si hay un <strong>ciclo</strong>, significan lo <strong>mismo</strong> y al quitarla <strong>no se pierde información</strong>. Tienen que darse las tres.</div>
` },

  { asig: "GBD", seccion: "Modelos lógicos", tema: "Modelo E/R", titulo: "Jerarquías", html: r`
<table>
<tr><th></th><th>Total (círculo)</th><th>Parcial (sin círculo)</th></tr>
<tr><td><strong>Exclusiva (arco)</strong></td><td>(1,1): una y solo una</td><td>(0,1): una o ninguna</td></tr>
<tr><td><strong>Inclusiva (sin arco)</strong></td><td>(1,n): una o varias</td><td>(0,n): las que sea o ninguna</td></tr>
</table><div class="note">Las de abajo <strong>heredan</strong> la clave y los atributos de la de arriba.<br>Pregúntate por una ocurrencia de arriba: ¿puede no ser ninguna? (total o parcial) ¿Puede ser varias? (exclusiva o inclusiva).</div>
` },

  { asig: "GBD", seccion: "Modelos lógicos", tema: "Paso a tablas", titulo: "De E/R a tablas", html: r`
<table>
<tr><th>Relación</th><th>Qué se hace</th></tr>
<tr><td>N:M</td><td>Tabla nueva. Clave: las dos claves juntas</td></tr>
<tr><td>1:N, lado uno (1,1)</td><td>La clave del lado uno pasa al lado muchos, como ajena</td></tr>
<tr><td>1:N, lado uno (0,1)</td><td>Igual, dejando que sea nula; o tabla nueva con la clave del lado muchos</td></tr>
<tr><td>1:N de identificación</td><td>Pasa y además forma parte de la clave</td></tr>
<tr><td>1:1, (1,1) y (1,1)</td><td>Pasa a cualquiera de las dos, o una sola tabla</td></tr>
<tr><td>1:1, (0,1) y (1,1)</td><td>La clave de la entidad (1,1) pasa a la tabla de la (0,1)</td></tr>
<tr><td>1:1, (0,1) y (0,1)</td><td>Tabla nueva</td></tr>
<tr><td>Reflexiva</td><td>Igual que las anteriores: la clave se repite con otro nombre (empleado y jefe)</td></tr>
<tr><td>Ternaria N:M:P</td><td>Tabla nueva con las tres claves</td></tr>
<tr><td>Ternaria 1:N:M</td><td>Tabla nueva; clave, las de los lados muchos</td></tr>
</table><div class="note">Si la relación N:M tiene atributos propios, mira si alguno debe entrar en la clave. Escribe siempre PK y FK:<br>EMPLEADO (<strong>dni</strong>, nombre, cod_dep FK)<br>DEPARTAMENTO (<strong>cod_dep</strong>, nombre)</div>
` },

  { asig: "GBD", seccion: "Modelos lógicos", tema: "Paso a tablas", titulo: "Jerarquías a tablas", html: r`
<table>
<tr><th>Opción</th><th>Cuándo</th><th>Pega</th></tr>
<tr><td>Todo en una tabla, con un campo tipo</td><td>Siempre se puede</td><td>Muchos nulos</td></tr>
<tr><td>Solo las de abajo, con los atributos de arriba</td><td>Solo si es total y exclusiva</td><td>Se repiten atributos y relaciones</td></tr>
<tr><td>Arriba y abajo, unidas 1:1 por la clave</td><td>La más fiel al modelo</td><td>Más combinaciones al consultar</td></tr>
</table><div class="note"><strong>Exclusiva:</strong> el campo tipo va en la de arriba y toma un solo valor. <strong>Inclusiva:</strong> tabla aparte con la clave y el tipo.<br><strong>Total:</strong> el tipo no puede ser nulo. <strong>Parcial:</strong> sí puede. Lo que no se pueda expresar así se controla con un disparador (trigger).</div>
` },

  { asig: "GBD", seccion: "Diseño físico (DDL)", tema: "Restricciones", titulo: "Restricciones y borrado en cadena", html: r`
<table>
<tr><th>Restricción</th><th>Qué obliga</th></tr>
<tr><td><code>NOT NULL</code></td><td>A tener valor</td></tr>
<tr><td><code>UNIQUE</code></td><td>A no repetirse (admite nulos)</td></tr>
<tr><td><code>PRIMARY KEY</code></td><td>Única y no nula; solo una por tabla</td></tr>
<tr><td><code>FOREIGN KEY</code></td><td>A existir en la otra tabla, o ser nulo</td></tr>
<tr><td><code>CHECK</code></td><td>A cumplir una condición</td></tr>
<tr><td><code>DEFAULT</code></td><td>Valor si no se indica (no es una restricción)</td></tr>
</table><table>
<tr><th>Al borrar la fila padre</th><th>Qué pasa con las hijas</th></tr>
<tr><td><code>RESTRICT</code> o <code>NO ACTION</code></td><td>No deja borrar</td></tr>
<tr><td><code>CASCADE</code></td><td>Se borran también</td></tr>
<tr><td><code>SET NULL</code></td><td>La clave ajena queda a nulo</td></tr>
</table><div class="note"><strong>Oracle</strong> solo tiene <code>ON DELETE CASCADE</code> y <code>ON DELETE SET NULL</code>; sin poner nada, no deja borrar.<br><strong>Crear:</strong> primero las tablas sin claves ajenas. <strong>Borrar:</strong> primero las que las tienen.<br><strong>Motores de MySQL:</strong> InnoDB tiene transacciones y claves ajenas; MyISAM, no.</div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Ethernet", titulo: "Trama, MAC y colisiones", html: r`
<div class="note"><strong>MAC:</strong> 6 bytes. Los 3 primeros (OUI) identifican al fabricante y los 3 últimos, la tarjeta. Difusión: FF:FF:FF:FF:FF:FF.<br><strong>Trama:</strong> de <strong>64 a 1518 bytes</strong>, con un código (CRC) al final para detectar errores. Menos de 64, <em>runt</em>, casi siempre una colisión. Con más de 1500 bytes de datos, <em>jumbo</em>.<br><strong>Semidúplex:</strong> o se envía o se recibe, y hay colisiones. <strong>Dúplex:</strong> las dos cosas a la vez, sin colisiones. Con la negociación automática se elige lo mejor que admitan los dos.<br><strong>CSMA/CD</strong> (semidúplex): escuchar; si está libre, enviar; si hay choque, avisar a todos, esperar un tiempo al azar y repetir.</div><div class="note"><strong>Ancho de banda:</strong> velocidad nominal. <strong>Rendimiento (throughput):</strong> la real. <strong>Latencia:</strong> retraso que añade cada equipo.<br><strong>Tormenta de difusión:</strong> tanto broadcast que la red se satura. Se limita con routers o VLAN.</div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "ICMP y TTL", titulo: "Mensajes ICMP y tiempo de vida", html: r`
<table>
<tr><th>Tipo</th><th>Mensaje</th><th>Cuándo</th></tr>
<tr><td>8</td><td>Petición de eco</td><td><code>ping</code> de ida</td></tr>
<tr><td>0</td><td>Respuesta de eco</td><td><code>ping</code> de vuelta</td></tr>
<tr><td>3</td><td>Destino inalcanzable</td><td>No hay ruta, equipo o puerto</td></tr>
<tr><td>5</td><td>Redirección</td><td>Hay una puerta de enlace mejor</td></tr>
<tr><td>11</td><td>Tiempo agotado</td><td>El TTL llegó a cero</td></tr>
</table><div class="note"><strong>TTL:</strong> cada router le resta uno. Si llega a 0, lo descarta y avisa con un tipo 11. Evita que un paquete dé vueltas para siempre.<br><strong>Cómo funciona <code>tracert</code>:</strong> envía con TTL 1, 2, 3… y apunta quién responde en cada salto.<br><strong>TTL inicial habitual:</strong> Linux 64, Windows 128, Cisco 255. Por el que llega se adivina el sistema y los saltos.</div>
` },

  { asig: "PAR", seccion: "Fundamentos", tema: "Subredes", titulo: "De una IP a su red", html: r`
<div class="note"><strong>Red</strong> = IP <em>AND</em> máscara. <strong>Difusión</strong> = la red con los bits de host a 1.<br>Ejemplo, 192.168.1.130/26: el salto es 64 y los múltiplos son 0, 64, <strong>128</strong> y 192. Como 130 está entre 128 y 192:<br>Red <strong>192.168.1.128</strong> · primera .129 · última .190 · difusión <strong>.191</strong>.<br>Dos equipos se hablan sin router solo si sale la <strong>misma red</strong> con la máscara de cada uno.<br>Con clases (A, B, C) está en desuso; lo actual es CIDR, con prefijo (/n).</div>
` },

  { asig: "PAR", seccion: "Switches", tema: "Conmutación", titulo: "Cómo decide un switch", html: r`
<div class="note">1. Llega una trama: apunta la <strong>MAC de origen</strong> y el puerto en su tabla (CAM).<br>2. Busca la <strong>MAC de destino</strong>:<br>— No está, o es de difusión: la envía por todos menos por donde llegó (<strong>inundación</strong>).<br>— Está en el mismo puerto: la descarta.<br>— Está en otro: la envía solo por ese (<strong>conmutación</strong>).</div><table>
<tr><th>Método</th><th>Cuándo empieza a enviar</th><th>Detecta errores</th></tr>
<tr><td>Almacenar y enviar</td><td>Con la trama entera</td><td>Sí, comprueba el CRC</td></tr>
<tr><td>Corte (envío rápido)</td><td>Al leer la MAC de destino</td><td>No</td></tr>
<tr><td>Libre de fragmentos</td><td>Tras los primeros 64 bytes</td><td>Solo las colisiones</td></tr>
</table><div class="note"><strong>Microsegmentación:</strong> un solo equipo por puerto y en dúplex; así no hay colisiones.</div>
` },

  { asig: "PAR", seccion: "Switches", tema: "Spanning Tree", titulo: "Por qué hace falta y cómo funciona", html: r`
<div class="note">Dos caminos entre switches dan tolerancia a fallos, pero forman un <strong>bucle</strong>: la difusión da vueltas sin fin, porque las tramas no tienen TTL.<br><strong>STP</strong> deja un solo camino y bloquea los demás; si cae, los activa.<br>1. <strong>Switch raíz:</strong> el de prioridad más baja; si empatan, la MAC más baja. Por defecto, 32768 más el número de VLAN.<br>2. <strong>Puerto raíz:</strong> en cada uno de los demás, el de menor coste hasta el raíz.<br>3. <strong>Puerto designado:</strong> uno por cada enlace.<br>4. Los que sobran, <strong>bloqueados</strong>.<br>Coste: 100 Mb/s, 19; 1 Gb/s, 4; 10 Gb/s, 2.</div>
` },

  { asig: "PAR", seccion: "Switches", tema: "VLAN y puertos", titulo: "VLAN: tipos y etiquetado", html: r`
<div class="note"><strong>VLAN:</strong> grupo lógico que funciona como una red aparte, estén donde estén los equipos. Cada una es un dominio de difusión; para pasar de una a otra hace falta capa 3.<br><strong>Estática:</strong> se asigna puerto a puerto; lo normal. <strong>Dinámica:</strong> según la MAC del equipo.<br><strong>802.1Q:</strong> el estándar, añade 4 bytes a la trama. <strong>ISL:</strong> el antiguo de Cisco.<br><strong>De extremo a extremo:</strong> por departamentos, con casi todo el tráfico dentro. <strong>Geográficas:</strong> por zonas, con casi todo el tráfico hacia fuera.</div><div class="callout cw"><span class="ci2">⚠️</span><div>Crear una VLAN se guarda solo en <code>vlan.dat</code>, pero <strong>asignar los puertos no</strong>: hay que hacer <code>write</code>.</div></div>
` },

];
