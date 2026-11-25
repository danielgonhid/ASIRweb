// Apuntes de teoría. Se ven plegados debajo de los comandos de su mismo tema.
// Para añadir uno: copia un bloque { area, tema, titulo, html }. El html va tal cual, sin acentos graves (usa &#96;).
const APUNTES = [
  { area: "SO y virtualización", tema: "Conceptos de SO", titulo: "¿Qué es un Sistema Operativo?", html: r`
<div class="note">
Es el software principal que tiene dos funciones clave:
<br>1. <strong>Controlar y gestionar</strong> todos los recursos HW (disco, memoria, CPU) y procesos (tareas simples como abrir un programa).
<br>2. <strong>Proporcionar una interfaz</strong> (textual o gráfica) que actúa de intermediario entre el usuario y la máquina.
</div>
<div class="callout ci"><span class="ci2">💡</span><div><strong>Esquema de capas:</strong> Usuario ➔ Aplicación ➔ Sistema Operativo ➔ Hardware.</div></div>
` },

  { area: "SO y virtualización", tema: "Conceptos de SO", titulo: "Clasificación de SO", html: r`
<div class="grid2">
<div class="ic"><div class="ic-lbl">Multitarea</div><div class="ic-val">Ilusión de simultaneidad</div><div class="ic-sub">En vez de hacer todo a la vez, dedica unos milisegundos a cada tarea creando la ilusión de que es simultáneo.</div></div>
<div class="ic"><div class="ic-lbl">Multiproceso</div><div class="ic-val">Aprovecha varios núcleos</div><div class="ic-sub">Aunque los PC de sobremesa tienen 1 solo procesador, los SO modernos saben aprovechar sus múltiples núcleos.</div></div>
<div class="ic"><div class="ic-lbl">Tiempo Compartido</div><div class="ic-val">"Cuando pueda te atiendo"</div><div class="ic-sub">Va dando ciclos de CPU a los procesos. No es como el <em>Tiempo Real</em> que debe responder en milisegundos exactos.</div></div>
<div class="ic"><div class="ic-lbl">Red vs Distribuido</div><div class="ic-val">Grupos de máquinas</div><div class="ic-sub"><strong>Red:</strong> Comparten recursos pero se ven como máquinas separadas.<br><strong>Distribuido:</strong> Se ven como una sola máquina (+ centralizado, + capacidad).</div></div>
</div>
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>¿Windows es multiusuario?</strong> Sí lo es. Pero ¡ojo! por defecto, si te conectas por Escritorio Remoto (RDP), expulsa al usuario que ya estaba activo por un tema de limitación de <strong>licencias</strong>, no por limitación técnica.</div></div>
` },

  { area: "SO y virtualización", tema: "Conceptos de SO", titulo: "Arquitectura del núcleo (kernel)", html: r`
<div class="note">El Kernel es la parte fundamental del SO que administra el hardware y los procesos. Hoy en día, Windows (NT) es <strong>Híbrido</strong> (toma lo mejor de ambos mundos: monolítico y microkernel) y Linux es <strong>monolítico modular</strong> (carga y descarga módulos en caliente).</div>
<table class="dt">
<tr><th>Arquitectura</th><th>Defensor Histórico</th><th>Características</th></tr>
<tr><td>Monolítico</td><td>Linus Torvalds (Linux)</td><td>Todo sobre el espacio Kernel. Muy rápido, pero un fallo en un driver colapsa el SO.</td></tr>
<tr><td>Microkernel</td><td>Andrew Tanenbaum (Minix)</td><td>Lo básico en Kernel, el resto de servicios en espacio de usuario. Más seguro.</td></tr>
</table>
<div class="callout ct"><span class="ci2">🥷</span><div><strong>Truco Ninja:</strong> Si en Windows se te bloquea el entorno gráfico, pulsa <code>Ctrl + Windows + Shift + B</code>. Esto reinicia el driver de vídeo sin necesidad de reiniciar el Kernel del ordenador (¡te puede salvar la vida!).</div></div>
` },

  { area: "SO y virtualización", tema: "Conceptos de SO", titulo: "Sistemas de ficheros", html: r`
<table class="dt">
<tr><th>Sistema</th><th>Compatibilidad / Uso</th></tr>
<tr><td>FAT32</td><td>Obsoleto, pero aún usado masivamente en USBs por compatibilidad universal.</td></tr>
<tr><td>NTFS</td><td>Windows (Nativo)</td></tr>
<tr><td>ext4</td><td>Linux (Por defecto)</td></tr>
<tr><td>APFS (antes HFS)</td><td>macOS (Apple)</td></tr>
<tr><td>XFS</td><td>Ficheros de alto rendimiento, ideal para Servidores Linux.</td></tr>
<tr><td>iso9660</td><td>Formato estándar para CD-ROM / DVD.</td></tr>
</table>
<div class="callout ci"><span class="ci2">📉</span><div><strong>¿Por qué mi disco de 1TB marca 931GB en Windows?</strong><br>Los fabricantes de discos (Hardware) usan el Sistema Internacional donde 1 KB = 1000 Bytes. <br>Los Sistemas Operativos (Técnico) usan el Sistema Binario donde 1 KiB = 1024 Bytes. Esa pérdida en la conversión es la razón técnica.</div></div>
` },

  { area: "SO y virtualización", tema: "Conceptos de SO", titulo: "Particiones (MBR vs GPT) y volúmenes", html: r`
<div class="note">
<strong>Regla de oro:</strong> Particionar SIEMPRE al instalar un SO. La partición es la división lógica del almacenamiento.<br>
• <strong>BIOS:</strong> Pequeño software instalado físicamente en la placa base (Usa particionamiento MBR).<br>
• <strong>UEFI:</strong> Igual que BIOS pero más moderno (Usa GPT). Permite modo "Legacy" para comportarse como BIOS y usar MBR (Windows 11 ya NO permite esto).
</div>
<div class="callout cw"><span class="ci2">⛔</span><div><strong>¿Puedo elegir MBR o GPT al instalar un SO?</strong> <strong>NO</strong>. El instalador detectará si tu placa ha arrancado en modo BIOS o UEFI y aplicará el esquema automáticamente. Para elegirlo tú, tienes que usar una herramienta externa (como GParted).</div></div>
<div class="callout ce"><span class="ci2">🎓</span><div><strong>PREGUNTAS CLÁSICAS DE EXAMEN:</strong><br><strong>1. Redundancia GPT:</strong> A diferencia de MBR, GPT tiene redundancia. Guarda la <strong>cabecera y la tabla de particiones</strong> tanto al <strong>inicio</strong> como al <strong>final</strong> del disco por si se estropean.<br><strong>2. Límites MBR:</strong> MBR solo permite 4 particiones primarias. Si necesitas más, la 4ª debe ser Extendida, y dentro crear "Lógicas" (Empiezan siempre en <code>/dev/sda5</code>).<br><strong>3. Volúmenes Lógicos (LVM) vs Particiones:</strong> Con particiones clásicas, para ampliar espacio hay que mover particiones enteras (difícil y peligroso). <strong>LVM permite añadir espacio y redimensionar "en caliente" sin mover nada.</strong></div></div>
<div class="callout ci"><span class="ci2">🦠</span><div><strong>Curiosidad MBR:</strong> El gestor de arranque (Bootloader) se guarda en el <strong>Sector 0</strong> del disco. Antiguamente, los virus se metían ahí; no perdías datos, pero el sistema literalmente no sabía cómo arrancar.</div></div>
` },

  { area: "SO y virtualización", tema: "Virtualización", titulo: "Operaciones frecuentes (VirtualBox)", html: r`
<div class="note"><strong>Guest Additions:</strong> Drivers que se instalan <em>dentro</em> de la MV para integración del ratón, carpetas compartidas y portapapeles.<br><br><strong>Snapshots (Instantáneas):</strong> ¡Cuidado, <strong>no son un Backup</strong>! Son una copia de la información del almacenamiento en ese instante exacto para volver atrás en caliente (en Windows equivalen a un "Punto de Restauración").<br><br><strong>Importar / Exportar:</strong> Guarda una MV entera en un archivo <code>.ova</code>.</div>
` },

  { area: "SO y virtualización", tema: "Virtualización", titulo: "Modos de red en VirtualBox", html: r`
<table class="dt">
<tr><th>Modo de Red</th><th>Acceso a Internet</th><th>Comunicación MV - MV</th><th>Visible en Red Física</th></tr>
<tr><td>NAT</td><td>✅ Sí</td><td>❌ No</td><td>❌ No</td></tr>
<tr><td>Adaptador Puente</td><td>✅ Sí</td><td>✅ Sí</td><td>✅ Sí</td></tr>
<tr><td>Red Interna</td><td>❌ No</td><td>✅ Sí</td><td>❌ No</td></tr>
<tr><td>NAT Red</td><td>✅ Sí</td><td>✅ Sí</td><td>❌ No</td></tr>
<tr><td>Red Solo Anfitrión</td><td>❌ No</td><td>✅ Sí</td><td>❌ No</td></tr>
</table>
` },

  { area: "SO y virtualización", tema: "Virtualización", titulo: "Hipervisores (gestores de MVs)", html: r`
<div class="grid2">
<div class="ic"><div class="ic-lbl">Tipo 1 (Bare-Metal)</div><div class="ic-val">Directo al Hardware</div><div class="ic-sub">Se desinstala el SO anfitrión, trabaja directo con el HW. Muy potente.<br><em>Ej: Proxmox, VMware ESXi.</em></div></div>
<div class="ic"><div class="ic-lbl">Tipo 2 (Hosted)</div><div class="ic-val">Sobre SO Anfitrión</div><div class="ic-sub">Capa de software sobre tu Windows/Linux.<br><em>Ej: VirtualBox, VMware Workstation.</em></div></div>
</div>
<div class="callout ci"><span class="ci2">⚙️</span><div><strong>Ojo con las integraciones:</strong> Hyper-V (Tipo 1 encubierto) ya viene integrado en Windows, pero hay que activarlo. KVM también viene integrado en el propio Kernel de Linux, pero requiere activación.</div></div>
<div class="callout ce"><span class="ci2">🎓</span><div><strong>PREGUNTA DE EXAMEN (BIOS/UEFI):</strong><br>Para poder virtualizar a buen rendimiento, hay que activar la <em>Virtualización asistida por Hardware</em> en la BIOS/UEFI. Sus nombres en clave son:<br>• Intel: <strong>VT-x</strong> (Codename: <em>Vanderpool</em>)<br>• AMD: <strong>AMD-V</strong> (Codename: <em>Pacifica</em>)</div></div>
` },

  { area: "SO y virtualización", tema: "Virtualización", titulo: "Contenedores y cloud computing", html: r`
<div class="note"><strong>Contenedores (MVs Ligeras):</strong> No tienen SO propio, usan las pequeñas librerías compartidas con el host.<br><br>• <strong>Docker:</strong> Herramienta para CREAR los contenedores.<br>• <strong>Kubernetes:</strong> Orquestador que GESTIONA esos contenedores a gran escala.<br>• <strong>Cloud Computing:</strong> AWS (Amazon) y Google Cloud son los líderes mundiales. <strong>OpenStack</strong> es una plataforma en la nube de código abierto (¡Dato: a los admins de esto se les paga muy bien!).<br>• <strong>Virtualización de Redes:</strong> SDN (Software Defined Networking) o virtualización de servidores DNS/DHCP.</div>
` },

  { area: "SO y virtualización", tema: "Instalación", titulo: "GParted y particionado desde fuera", html: r`
<div class="callout ci"><span class="ci2">💽</span><div><strong>GParted (GNOME Partition Editor):</strong> Siempre es más adecuado usar el particionador integrado del SO, pero están limitados. En Windows, para particionar desde fuera (GParted en USB Live), recuerda que <strong>tienes que deshabilitar BitLocker</strong> primero o no podrás leer el disco.</div></div>
` },

  { area: "SO y virtualización", tema: "Instalación", titulo: "Instalaciones desatendidas", html: r`
<div class="note">Automatizan la instalación del SO para entornos corporativos, leyendo las respuestas desde un archivo:<br>• <span style="color:var(--win)">Windows:</span> <code>autounattend.xml</code> (busca auto al arrancar el USB/DVD).<br>• <span style="color:var(--linux)">Debian/Ubuntu:</span> <code>preseed.cfg</code> (parámetro <code>auto url=</code>). Ubuntu Server actual usa <code>autoinstall</code>.<br>• <span style="color:var(--danger)">Red Hat/CentOS:</span> <code>ks.cfg</code> (parámetro <code>inst.ks=</code> al iniciar; antes <code>ks=</code>).</div>
` },

  { area: "SO y virtualización", tema: "Instalación", titulo: "Dual boot: primero Windows", html: r`
<div class="callout ct"><span class="ci2">🥷</span><div><strong>Regla de oro de Dual Boot:</strong> A la hora de tener 2 SO en un equipo, se instala <strong>PRIMERO Windows</strong> y luego Linux. Linux es capaz de detectar que ya existe Windows y respetarlo creando el GRUB, pero Windows suele sobrescribir el arranque si se instala después.</div></div>
` },

  { area: "Linux", tema: "Sistema", titulo: "Origen de Linux, terminales y GRUB", html: r`
<div class="note"><strong>Ojo: UNIX no es LINUX.</strong> <br>• <strong>UNIX:</strong> Creado por Dennis Ritchie y Ken Thompson en los 70. Su versión comercial de 1982 no era de código abierto.<br>• <strong>Minix:</strong> Versión educativa (Andrew Tanenbaum) sin prohibiciones de código.<br>• <strong>Linux:</strong> En 1991, <strong>Linus Torvalds</strong> desarrolló el Kernel Linux (basado en UNIX pero desde 0). Su éxito se debe a que Linus lo agregó al proyecto GNU de Richard Stallman, creando así <strong>GNU/Linux</strong> (admite drivers libres y también privativos, como el de NVIDIA).</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">GUI (Graphical User Interface)</div><div class="ic-val">Entorno Gráfico</div><div class="ic-sub">Visual para usuario final. Por debajo funciona gracias al sistema de ventanas <strong>X Window System</strong> o al moderno <strong>Wayland</strong>.</div></div>
<div class="ic"><div class="ic-lbl">CLI (Command Line Interface)</div><div class="ic-val">Línea de Comandos</div><div class="ic-sub">Potente y programable (Scripts). Se accede vía <code>tty</code>: <code>pts/0</code> (Terminal Gráfica) o <code>tty1</code> (Consola de Texto puro).</div></div>
</div>
<div class="callout ci"><span class="ci2">💻</span><div><strong>Terminales Virtuales y GRUB:</strong> Linux tiene 6 terminales de texto. Accedes con <code>Ctrl + Alt + F1</code> a <code>F6</code>. El entorno gráfico suele estar en tty1 o tty2 (antiguamente, en tty7). El <strong>GRUB</strong> es la pantallita negra inicial que te permite elegir qué Sistema Operativo arrancar (si tienes varios).</div></div>
<div class="callout ct"><span class="ci2">⌨️</span><div><strong>Truco Ninja (Multilínea en Bash):</strong> Si un comando es muy largo, puedes usar <code>\ + enter</code> para pasar a la siguiente línea sin ejecutarlo todavía.</div></div>
` },

  { area: "Linux", tema: "Ficheros", titulo: "Conceptos clave de Linux", html: r`
<div class="callout ce"><span class="ci2">🎓</span><div><strong>CONCEPTOS CLAVE DE LINUX (Examen)</strong><br>1. <strong>TODO es un archivo:</strong> Un disco, un USB, la pantalla de tu terminal... para Linux, todo se gestiona como si fuera un archivo (la excepción clásica son las tarjetas de red, que no aparecen en <code>/dev</code>).<br>2. <strong>Case Sensitive:</strong> Linux distingue rígidamente entre mayúsculas y minúsculas (<code>Foto.jpg</code> es distinto a <code>foto.jpg</code>). Windows "se lo traga" y da igual.</div></div>
` },

  { area: "Linux", tema: "Ficheros", titulo: "El árbol de directorios", html: r`
<div class="note">A diferencia de Windows (que crea un árbol C:, D: por cada disco), Linux tiene una jerarquía unificada bajo un solo directorio raíz <code>/</code>.</div>
<table class="dt">
<tr><th>Directorio</th><th>Contenido Principal</th></tr>
<tr><td><code>/bin</code> vs <code>/sbin</code></td><td><code>bin</code>: Comandos para el usuario normal.<br><code>sbin</code>: Comandos fundamentales del Administrador (root).</td></tr>
<tr><td><code>/home</code></td><td>Datos del usuario (ej. <code>/home/heidi</code>). Atajo: <code>~</code></td></tr>
<tr><td><code>/etc</code></td><td>Archivos de <strong>configuración</strong> del sistema y servicios.</td></tr>
<tr><td><code>/var</code></td><td>Datos variables (ej. <code>/var/log/auth.log</code>, registros de acceso).</td></tr>
<tr><td><code>/dev</code> y <code>/media</code></td><td><code>dev</code> = Dispositivos físicos (terminales, discos).<br><code>media</code> = Lo que montas (USB insertados).</td></tr>
<tr><td><code>/usr</code></td><td>Programas de usuario y comandos NO esenciales (ej. juegos).</td></tr>
</table>
` },

  { area: "Linux", tema: "Ficheros", titulo: "Inodos y enlaces", html: r`
<div class="note">Un <strong>Inodo</strong> es la entrada real en la tabla del disco que indica dónde se guarda físicamente un archivo. Un archivo no es su nombre, es su inodo.</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">Enlace Blando (Simbólico)</div><div class="ic-val">Apunta a la ruta</div><div class="ic-sub">Es como el acceso directo de Windows. Si borras o mueves el archivo original, el enlace se rompe.</div></div>
<div class="ic"><div class="ic-lbl">Enlace Duro (Hard Link)</div><div class="ic-val">Apunta al inodo</div><div class="ic-sub">Siempre sabe dónde está el archivo aunque le cambies el nombre o la ruta, porque apunta a su espacio físico en el disco duro.</div></div>
</div>
` },

  { area: "Linux", tema: "Ficheros", titulo: "Papelera desde la terminal", html: r`
<div class="callout ct"><span class="ci2">🗑️</span><div><strong>Truco Ninja: Papelera desde Terminal.</strong><br>Si usas interfaz gráfica y borras algo sin querer, puedes recuperarlo desde la terminal yendo a: <code>~/.local/share/Trash/files</code></div></div>
` },

  { area: "Linux", tema: "Filtros y texto", titulo: "Redireccionamiento", html: r`
<div class="note">Por defecto: <strong>0</strong> (Entrada/Teclado), <strong>1</strong> (Salida Normal/Pantalla), <strong>2</strong> (Salida Errores).<br>• <code>></code> Sobrescribe el archivo.<br>• <code>>></code> Añade al final del archivo.<br>• <code>2></code> Redirige solo los errores.</div>
` },

  { area: "Linux", tema: "Comprimir", titulo: "Empaquetar vs comprimir", html: r`
<div class="callout ce"><span class="ci2">🎓</span><div><strong>PREGUNTA DE EXAMEN: Empaquetar vs Comprimir</strong><br>• <strong>Empaquetar (.tar):</strong> Juntar varios archivos en uno solo, SIN reducir el tamaño.<br>• <strong>Comprimir (.gz, .bz2):</strong> Juntar reduciendo el tamaño del archivo mediante algoritmos. El <code>.tar</code> es el formato por excelencia de Linux.</div></div>
` },

  { area: "Linux", tema: "Usuarios y permisos", titulo: "Estructura de permisos", html: r`
<div class="note">Los permisos se dividen en 3 bloques de 3 letras: <strong>Propietario</strong> (u), <strong>Grupo</strong> (g) y <strong>Resto/Otros</strong> (o).<br>• <code>r</code> (Lectura - 4)<br>• <code>w</code> (Escritura - 2)<br>• <code>x</code> (Ejecución - 1)<br><br><em>Ejemplo:</em> <code>-rwxr-xr--</code> significa 754 (Propietario todo, grupo lee/ejecuta, resto lee).</div>
` },

  { area: "Linux", tema: "Variables y scripts", titulo: "Comparar y asignar en Bash", html: r`
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>Ojo al programar scripts y comandos:</strong> <strong>Asignar:</strong> <code>X=5</code>, sin espacios alrededor del <code>=</code>. <strong>Comparar texto:</strong> <code>[ "$X" = "5" ]</code>, con espacios; <code>==</code> también compara, pero es propio de Bash (<code>[[ $X == 5 ]]</code>). <strong>Comparar números:</strong> <code>-eq</code>.</div></div>
` },

  { area: "Linux", tema: "Paquetes", titulo: "Imágenes ISO y hash", html: r`
<div class="note"><strong>Imagen ISO:</strong> Es una imagen exacta (sin comprimir) de un disco, que suele contener toda la información "booteable" para instalar un Sistema Operativo.<br><strong>Sistema Hash (SHA256):</strong> Código alfanumérico que certifica que una imagen ISO descargada es verdadera y no ha sido manipulada o corrupta.</div>
` },

  { area: "Linux", tema: "Paquetes", titulo: "Ramas de Debian", html: r`
<div class="grid2">
<div class="ic"><div class="ic-lbl">Stable (Estable)</div><div class="ic-val">Para Servidores</div><div class="ic-sub">Todo está requetecomprobado. No entran paquetes nuevos, es un sistema "cerrado". Fiabilidad 100%.</div></div>
<div class="ic"><div class="ic-lbl">Testing (Pruebas)</div><div class="ic-val">Software actualizado</div><div class="ic-sub">Funciona perfecto, tiene software más actual, pero no está "cerrado" (preparación para ser el futuro estable).</div></div>
</div>
<div class="callout ci"><span class="ci2">😈</span><div><strong>Unstable (SID):</strong> La rama de desarrollo activo. Los paquetes nuevos entran directamente aquí y puede romper tu sistema. Siempre se llama "Sid" (el niño rompe-juguetes de Toy Story).</div></div>
` },

  { area: "Linux", tema: "Paquetes", titulo: "Gestión de software: APT y DPKG", html: r`
<div class="callout ce"><span class="ci2">🛡️</span><div><strong>Regla de oro de los Administradores de Servidores:</strong> NO instalar jamás archivos <code>.deb</code> ajenos o cosas de fuera de los repositorios oficiales, a menos que sea un software hiper-específico de la empresa.</div></div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">APT (Advanced Package Tool)</div><div class="ic-val">Gestor de Repositorios</div><div class="ic-sub">Descarga de internet y resuelve las dependencias automáticamente.<br><em>Ej: <code>apt install htop</code></em></div></div>
<div class="ic"><div class="ic-lbl">DPKG</div><div class="ic-val">Instalador Local</div><div class="ic-sub">Instala archivos .deb descargados, pero NO resuelve dependencias de red.</div></div>
</div>
` },

  { area: "Linux", tema: "Paquetes", titulo: "Firefox ESR vs Stable", html: r`
<div class="callout ci"><span class="ci2">🦊</span><div><strong>Firefox ESR vs Stable:</strong> Debian trae por defecto <em>Firefox ESR (Extended Support Release)</em> que se actualiza solo 1 vez al año para máxima estabilidad. Si instalas manualmente la versión <em>Stable</em>, lo normal es alojarla en <code>/opt</code> y crear su acceso directo con la herramienta <code>alacarte</code>.</div></div>
` },

  { area: "Linux", tema: "Discos", titulo: "Sectores y bloques", html: r`
<div class="note">A nivel físico, un disco duro se divide en <strong>Sectores</strong> (unidades mínimas de 512 bytes).<br>A nivel lógico, el Sistema Operativo agrupa esos sectores en <strong>Bloques</strong> para leer/escribir más rápido (1 Bloque = 4KB = 8 sectores).</div>
` },

  { area: "Linux", tema: "Discos", titulo: "Grabar una ISO en un USB", html: r`
<div class="grid2">
<div class="ic"><div class="ic-lbl">BalenaEtcher / Rufus</div><div class="ic-val">Entorno Gráfico</div><div class="ic-sub">Programas externos que descomprimen la ISO y la inyectan en el USB de forma segura.</div></div>
<div class="ic"><div class="ic-lbl">Comando: dd</div><div class="ic-val">Poder Absoluto</div><div class="ic-sub">Muy potente y peligroso. Viene nativo en la terminal. Si te equivocas de disco destino te borras todo el PC.</div></div>
</div>
` },

  { area: "Linux", tema: "Discos", titulo: "Por qué las lógicas empiezan en sda5", html: r`
<div class="callout ce"><span class="ci2">🎓</span><div><strong>PREGUNTA DE EXAMEN (MBR): ¿Por qué las particiones lógicas empiezan SIEMPRE en /dev/sda5?</strong><br>Porque el sistema clásico MBR solo permite registrar un máximo de <strong>4 particiones primarias</strong> (sda1, sda2, sda3, sda4). Si necesitas más de cuatro, tienes que coger una de esas 4 y convertirla en "Extendida". Dentro de la Extendida se crean las particiones "Lógicas", por lo que el sistema siempre empieza a numerarlas a partir de la sda5.</div></div>
` },

  { area: "Linux", tema: "Discos", titulo: "Recuperar la contraseña de root", html: r`
<div class="callout ct"><span class="ci2">🔓</span><div><strong>Truco Ninja: Romper contraseña de root (Práctica U10)</strong><br>Si olvidas la clave de root, puedes reiniciar el equipo, editar la línea del kernel en el <strong>GRUB</strong> (pulsando la tecla 'e') y añadir <code>init=/bin/bash</code> al final. Esto te dará una consola con permisos de root puros sin pedir clave. El disco está en solo lectura, así que antes hay que lanzar <code>mount -o remount,rw /</code>; después, <code>passwd</code> para establecer una nueva y <code>exec /sbin/init</code> para seguir arrancando.</div></div>
` },

  { area: "Linux", tema: "Redes", titulo: "Nombre del equipo (hostname)", html: r`
<table class="dt">
<tr><th>Archivo / Comando</th><th>Función</th></tr>
<tr><td><code>/etc/hostname</code></td><td>Guarda el nombre del equipo. Requiere reinicio si se edita a mano.</td></tr>
<tr><td><code>/etc/hosts</code></td><td>Actúa como un DNS local. Asocia IPs a nombres de host.</td></tr>
</table>
` },

  { area: "Linux", tema: "Redes", titulo: "Configuración en Debian (interfaces y DNS)", html: r`
<div class="note">Debian (sin entorno gráfico) usa el archivo <code>/etc/network/interfaces</code> para configurar las tarjetas. <br><strong>¡Ojo!</strong> Solo en Debian 13 se meten los DNS dentro de este archivo. En versiones anteriores, se modifican en el archivo <code>/etc/resolv.conf</code>.<br><em>Tip: Si hay dos tarjetas o más, el Gateway y el DNS se ponen <strong>solo en una</strong> (la que sale a internet). Al hacerlo, pon <code>systemctl restart networking.service</code> para aplicar cambios.</em></div>
` },

  { area: "Linux", tema: "Redes", titulo: "Configuración en Ubuntu Server (Netplan)", html: r`
<div class="note">Ubuntu utiliza <strong>Netplan</strong> (<code>/etc/netplan/</code>). ¡Atención! <strong>NO SE PUEDEN USAR TABULADORES, SOLO ESPACIOS.</strong></div>
` },

  { area: "Linux", tema: "SSH y copia remota", titulo: "Administración remota y directorios activos", html: r`
<div class="note">La administración remota permite gestionar servidores sin acceso físico.<br><strong>SSH (Secure Shell):</strong> Es el protocolo estándar en Linux. Cifra de extremo a extremo toda la comunicación. Supera a una VPN si solo necesitas acceso a comandos.</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">Active Directory (AD)</div><div class="ic-val">Ecosistema Windows</div><div class="ic-sub">Servidor de Windows que permite centralizar los usuarios y ordenadores, permitiendo trabajar en tu perfil desde cualquier PC de la empresa.</div></div>
<div class="ic"><div class="ic-lbl">OpenLDAP</div><div class="ic-val">El homólogo de Linux</div><div class="ic-sub">Servicio de directorio de código abierto usado en servidores Linux para centralizar identidades de manera similar a Windows.</div></div>
</div>
` },

  { area: "Linux", tema: "SSH y copia remota", titulo: "Clave pública vs privada", html: r`
<div class="callout cw"><span class="ci2">🔑</span><div><strong>Clave Pública vs Privada:</strong> Las claves se crean en el ordenador principal. La Pública (<code>.pub</code>) va para el servidor, y la Privada <strong>NUNCA SE PASA</strong>. Las huellas de los servidores a los que te conectas se guardan en <code>.ssh/known_hosts</code>.</div></div>
` },

  { area: "Linux", tema: "SSH y copia remota", titulo: "Opciones avanzadas (sshd_config)", html: r`
<div class="note">Por seguridad, Debian no deja entrar a root por SSH con contraseña (con clave sí). Para permitirlo, hay que editar <code>/etc/ssh/sshd_config</code> y cambiar <code>#PermitRootLogin prohibit-password</code> por <strong><code>PermitRootLogin yes</code></strong> y aplicar con <code>sudo systemctl restart ssh</code>. ⚠️ Es inseguro: solo para prácticas, nunca en un servidor real.<br>También es una gran medida de seguridad cambiar el <strong>Puerto por defecto (22)</strong> a uno distinto, como <code>Port 2222</code>.</div>
` },

  { area: "Windows", tema: "PowerShell básico", titulo: "Trucos de consola", html: r`
<div class="callout ct"><span class="ci2">🥷</span><div><strong>Trucos Ninja de Consola:</strong> <br>1. <strong>Pasar a siguiente línea:</strong> Usa el acento grave y enter (<code>&#96; + enter</code>) para hacer saltos de línea sin ejecutar en PowerShell.<br>2. <strong>Salir a PowerShell:</strong> Si estás en la consola de <code>sconfig</code> de un Windows Server Core, pulsa la <strong>opción 15</strong> para salir directo a comandos.</div></div>
` },

  { area: "Windows", tema: "PowerShell básico", titulo: "La guerra de versiones y scripts multiplataforma", html: r`
<div class="note">Microsoft no actualiza automáticamente Windows a PowerShell 7 por <strong>compatibilidad empresarial</strong>. Miles de scripts de servidores de todo el mundo dependen del motor antiguo (.NET Framework).<br><br>Con PowerShell 7 (multiplataforma), existen <strong>variables automáticas</strong> que te permiten crear un único script que funcione distinto según el sistema donde se ejecute: <code>$IsWindows</code>, <code>$IsLinux</code> y <code>$IsMacOS</code>.</div>
` },

  { area: "Windows", tema: "PowerShell básico", titulo: "Estructura de un cmdlet", html: r`
<div class="note">Los comandos en PowerShell se llaman <strong>Cmdlets</strong> (command-lets) y siempre siguen la misma lógica estricta: <code>Verbo-Sustantivo</code> en inglés singular. (Ej: <code>Get-Process</code>).</div>
` },

  { area: "Windows", tema: "PowerShell básico", titulo: "PowerShell ISE vs Windows Terminal", html: r`
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>PowerShell ISE vs Windows Terminal:</strong><br><strong>PowerShell ISE</strong> era el entorno gráfico clásico para programar scripts en Windows, pero actualmente está <strong>en desuso y abandonado</strong> por Microsoft. Su reemplazo oficial para ejecutar herramientas es la moderna <strong>Windows Terminal</strong> (que aúna CMD, PowerShell y WSL), y para programar se recomienda usar <em>Visual Studio Code</em>.</div></div>
` },

  { area: "Windows", tema: "Ficheros", titulo: "System32 vs SysWOW64", html: r`
<div class="callout ce"><span class="ci2">🤯</span><div><strong>La Paradoja de Windows (System32 vs SysWOW64):</strong><br>• La carpeta <code>C:\Windows\System32</code> contiene archivos para sistemas de <strong>64 bits</strong> (Microsoft mantuvo el nombre por compatibilidad con programas antiguos).<br>• La carpeta <code>C:\Windows\SysWOW64</code> contiene los archivos de <strong>32 bits</strong> (Significa "Windows 32-bit On Windows 64-bit").</div></div>
` },

  { area: "Windows", tema: "Ficheros", titulo: "Unidades unificadas (PSDrive)", html: r`
<div class="note">A diferencia del CMD clásico que solo veía discos físicos (C:, D:), PowerShell unifica el acceso a todo el sistema a través de "Unidades Virtuales". (Nota: <code>C:\</code> es la carpeta raíz de windows).</div>
` },

  { area: "Windows", tema: "Ficheros", titulo: "El salvavidas -WhatIf", html: r`
<div class="callout ct"><span class="ci2">🦺</span><div><strong>El Salvavidas (-WhatIf):</strong> PowerShell incluye el parámetro <code>-WhatIf</code> que te dice exactamente qué pasaría si ejecutas un comando destructivo, pero <strong>sin llegar a borrar nada de verdad</strong>. (Ej: <code>Remove-Item .\sistema -Recurse -WhatIf</code>).</div></div>
` },

  { area: "Windows", tema: "Ficheros", titulo: "Atributos de archivos", html: r`
<div class="note">Los atributos base de archivos en Windows son: <strong>a</strong> (Archivo), <strong>d</strong> (Directory), <strong>h</strong> (Hidden/Oculto), <strong>r</strong> (ReadOnly/Solo lectura), <strong>s</strong> (System/Sistema).</div>
` },

  { area: "Windows", tema: "Alias y perfil", titulo: "Alias permanentes ($PROFILE)", html: r`
<div class="callout ci"><span class="ci2">⚙️</span><div><strong>Hacer los Alias Permanentes ($PROFILE):</strong><br>Usa <code>notepad $PROFILE</code> (o nano) para abrir el archivo de configuración base de tu usuario. Escribe dentro tus <code>New-Alias</code> y guarda. Para que se apliquen sin tener que cerrar la sesión, ejecuta <code>. $PROFILE</code> (equivale a <code>source .bashrc</code> en Linux).</div></div>
` },

  { area: "Windows", tema: "Objetos y filtros", titulo: "Objetos, no texto", html: r`
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>Diferencia CLAVE con Linux:</strong> En Linux, las tuberías (<code>|</code>) pasan <em>Texto Plano</em>. En PowerShell, <strong>LOS RESULTADOS NO SON TEXTO, SON OBJETOS</strong> (pasan con todas sus propiedades matemáticas como Tamaño, Fecha, etc. intactas).</div></div>
` },

  { area: "Windows", tema: "Software", titulo: "Instalación clásica (.msi / .exe)", html: r`
<div class="note">Muchos programas aún se distribuyen directamente desde la web. Para automatizar su descarga e instalación en un servidor, usamos <code>curl.exe</code> y <code>msiexec</code> (.msi pensado para servidores).</div>
` },

  { area: "Windows", tema: "Software", titulo: "Winget", html: r`
<div class="note">Herramienta de software nativa. En vez de repositorios, usa "manifiestos" (urls). Ideal para instalar software común como navegadores.</div>
` },

  { area: "Windows", tema: "Software", titulo: "Chocolatey", html: r`
<div class="note">Gestor comunitario hiper-robusto externo (parecido a apt de Linux). Es el estándar de facto para automatizar tareas e instalaciones en Windows Server.</div>
` },

  { area: "Windows", tema: "Usuarios y permisos", titulo: "Permisos NTFS vs compartidos", html: r`
<div class="note"><strong>Permisos NTFS:</strong> Son las listas de control de acceso (ACL) integradas en el disco duro. Se aplican SIEMPRE, tanto si el usuario se sienta físicamente en el servidor, como si entra por red.<br><strong>Permisos Compartidos:</strong> Solo entran en juego cuando se accede a la carpeta a través de la Red (vía <code>\\Servidor\Recurso</code>). Si accedes en local, no sirven de nada.</div>
<div class="callout ce"><span class="ci2">🎓</span><div><strong>PREGUNTA DE EXAMEN: Permisos y RDP (Escritorio Remoto)</strong><br>¿Si Heidi entra a Windows Server usando Escritorio Remoto (RDP), se le aplican los permisos NTFS o los Compartidos de red?<br><br><strong>Respuesta: SOLO LOS NTFS.</strong> Aunque te conectes desde otro PC, una conexión RDP inicia sesión <em>dentro</em> del servidor, como si estuvieras sentado físicamente delante de él. No estás cruzando una ruta de red compartida (UNC).</div></div>
` },

  { area: "Windows", tema: "Usuarios y permisos", titulo: "La regla de oro de los permisos", html: r`
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>El Denegado gana al Permitido (Deny > Allow), al mismo nivel:</strong><br>Cuando Windows evalúa si Pedro puede abrir una carpeta, hace esto:<br>1. Suma todos los permisos <em>Allow</em> que tiene Pedro como usuario.<br>2. Suma todos los permisos <em>Allow</em> de los grupos a los que pertenece Pedro.<br>3. <strong>Si existe un <em>Deny (Denegar)</em> al mismo nivel, gana al Allow.</strong><br>4. <strong>Ojo, lo explícito gana a lo heredado:</strong> Deny explícito > Allow explícito > Deny heredado > Allow heredado. Un Allow puesto en la propia carpeta gana a un Deny heredado de la carpeta padre.</div></div>
` },

  { area: "Windows", tema: "Redes", titulo: "El problema del ping y el firewall", html: r`
<div class="callout ce"><span class="ci2">🛡️</span><div><strong>El Ping está bloqueado por defecto:</strong><br>El Firewall de Windows Server bloquea las solicitudes de ping (ICMP) por seguridad. Por mucho que pruebes conexión con una dirección haciendo <code>ping x</code>, si el firewall no está bajado o no tiene regla, fallará.</div></div>
` },

  { area: "Windows", tema: "SSH y copia remota", titulo: "OpenSSH en Windows Server", html: r`
<div class="note">En servidores modernos Server Core, <strong>OpenSSH</strong> ya viene soportado, permitiendo administrar Windows exactamente igual que Linux desde una terminal cifrada.</div>
` },

  { area: "Bases de datos", tema: "Conceptos", titulo: "Bases de datos vs ficheros", html: r`
<div class="note">Queremos guardar los datos de los <strong>alumnos de un instituto</strong>, así como las asignaturas de las que están matriculados y las notas que han obtenido. Este mismo problema se ha resuelto de forma diferente a lo largo de la historia:</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">Años 60</div><div class="ic-val">📝 Papel y boli</div><div class="ic-sub">Una ficha por alumno.</div></div>
<div class="ic"><div class="ic-lbl">Años 70-80</div><div class="ic-val">📄 Ficheros de texto</div><div class="ic-sub">Ficheros individuales, datos repetidos.</div></div>
<div class="ic"><div class="ic-lbl">Años 90 →</div><div class="ic-val">🗄️ Bases de Datos</div><div class="ic-sub">Un SGBD relacional elimina la redundancia.</div></div>
</div>
` },

  { area: "Bases de datos", tema: "Conceptos", titulo: "Arquitectura en niveles ANSI/SPARC", html: r`
<div class="note">
El comité ANSI/SPARC definió una arquitectura estándar para los SGBD con <strong>tres niveles independientes</strong>. Su objetivo es separar cómo se ven los datos, cómo están organizados lógicamente y cómo están almacenados físicamente.
</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">Nivel Externo o de Visión</div><div class="ic-val">👤 Lo que ve el usuario</div><div class="ic-sub">Vistas. Nivel lógico.</div></div>
<div class="ic"><div class="ic-lbl">Nivel Conceptual</div><div class="ic-val">🧠 Tablas y relaciones</div><div class="ic-sub">Tablas y atributos. El que conocen los programadores.</div></div>
<div class="ic"><div class="ic-lbl">Nivel Interno o Físico</div><div class="ic-val">💾 Discos y ficheros</div><div class="ic-sub">Nivel de administradores (DBA).</div></div>
</div>
` },

  { area: "Bases de datos", tema: "Conceptos", titulo: "El modelo Entidad/Relación", html: r`
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

  { area: "Bases de datos", tema: "Tablas (DDL)", titulo: "Diseño físico (DDL)", html: r`
<div class="note">Comandos esenciales: <code>CREATE TABLE</code>, <code>ALTER TABLE</code>, <code>DROP TABLE</code>. Uso de Constraints para integridad de dominio y referencial.</div>
` },

  { area: "Bases de datos", tema: "Consultas", titulo: "Proyección y selección", html: r`
<div class="note">
La sentencia <code>SELECT</code> se emplea para recuperar datos. Las operaciones principales son la <strong>Proyección</strong> (seleccionar columnas) y la <strong>Selección</strong> (filtrar filas mediante <code>WHERE</code>).
</div>
` },

  { area: "Bases de datos", tema: "INSERT", titulo: "Inserción de registros", html: r`
<div class="note">Para añadir nuevas filas a una tabla se emplea la orden <code>INSERT INTO ... VALUES</code>. Los valores deben corresponder con el tipo de dato de la columna.
</div>
` },

  { area: "Bases de datos", tema: "INSERT", titulo: "INSERT con SELECT", html: r`
<div class="note">
Permite insertar en una tabla un conjunto masivo de datos provenientes de otra tabla o consulta. Muy útil para hacer copias de seguridad, históricos o poblar tablas intermedias.
</div>
` },

  { area: "Bases de datos", tema: "UPDATE", titulo: "Modificación de registros", html: r`
<div class="note">
Para actualizar valores de filas que <strong>ya existen</strong> en la base de datos se usa <code>UPDATE ... SET</code>.
</div>
<div class="callout cw"><span class="ci2">⚠️</span><div><strong>REGLA DE ORO:</strong> Si se omite la cláusula <code>WHERE</code>, se actualizarán <strong>TODAS</strong> las filas de la tabla. ¡Cuidado con esto en producción!</div></div>
` },

  { area: "Bases de datos", tema: "UPDATE", titulo: "Actualización con subconsultas", html: r`
<div class="note">
Puedes usar subconsultas tanto en el lado derecho del <code>SET</code> (para calcular el nuevo valor) como en la cláusula <code>WHERE</code> (para localizar a quién actualizar).
</div>
` },

  { area: "Bases de datos", tema: "DELETE", titulo: "Borrado de registros", html: r`
<div class="note">
Para eliminar filas completas de una tabla se utiliza <code>DELETE FROM</code>. No se pueden borrar columnas específicas con DELETE (eso sería un <code>UPDATE ... SET col = NULL</code> o un <code>ALTER TABLE DROP COLUMN</code>).
</div>
<div class="callout td"><span class="ci2">🔥</span><div><strong>¡PELIGRO!</strong> <code>DELETE FROM emp;</code> sin <code>WHERE</code> borrará absolutamente <strong>todos los empleados</strong> de la tabla. Para vaciar una tabla es más eficiente <code>TRUNCATE TABLE emp;</code>, pero es DDL: hace <strong>COMMIT implícito y no se puede deshacer con ROLLBACK</strong>. En MySQL además reinicia los autoincrementales (en Oracle no).</div></div>
` },

  { area: "Bases de datos", tema: "Transacciones", titulo: "Control de transacciones (ACID)", html: r`
<div class="note">Una <strong>transacción</strong> es una secuencia de una o más sentencias SQL que, juntas, forman una unidad lógica de trabajo. Garantizan la <strong>Atomicidad</strong>: o se ejecutan todas con éxito, o no se ejecuta ninguna.
</div>
<div class="grid2">
<div class="ic"><div class="ic-lbl">COMMIT</div><div class="ic-val">✅ Validar y Guardar</div><div class="ic-sub">Consolida y guarda en disco de forma permanente todas las operaciones DML realizadas desde que inició la transacción.</div></div>
<div class="ic"><div class="ic-lbl">ROLLBACK</div><div class="ic-val">⏪ Deshacer</div><div class="ic-sub">Aborta la transacción, deshaciendo todos los INSERT, UPDATE y DELETE y volviendo al estado del último COMMIT.</div></div>
</div>
` },

  { area: "Bases de datos", tema: "Transacciones", titulo: "AUTOCOMMIT y commits implícitos", html: r`
<div class="note">
<strong>AUTOCOMMIT:</strong> En muchos entornos (como MySQL o iSQL*Plus) existe un parámetro AUTOCOMMIT. Si está en ON, cada sentencia <code>UPDATE</code> o <code>INSERT</code> se guarda instantáneamente.<br><br>
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

  { area: "Bases de datos", tema: "Errores comunes", titulo: "Integridad y restricciones", html: r`
<div class="note">Durante las inserciones y modificaciones puedes encontrarte con errores del SGBD causados por las restricciones creadas en la Unidad 3:
</div>
<table class="dt">
<tr><th>Situación / Error</th><th>Causa / Explicación del sistema</th></tr>
<tr><td>Insertar cadena que supera el límite</td><td>Si un <code>VARCHAR2(15)</code> recibe 'Gargantilla del Lozoya', el sistema rechazará el <code>INSERT</code> por desbordamiento de tamaño.</td></tr>
<tr><td>Foreign Key Constraint Violation</td><td>Ocurre al intentar borrar un departamento que aún tiene empleados dentro. Solución: Borrar primero los empleados (o usar <code>ON DELETE CASCADE</code>).</td></tr>
<tr><td>Unique / Primary Key Constraint</td><td>Ocurre al intentar insertar un <code>ID</code> (ej: id_empleado 1001) que ya existe en la base de datos.</td></tr>
</table>
` },

];
