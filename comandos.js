// CÓMO AÑADIR UN COMANDO: copia una línea y cámbiala.
//   [r`el comando`, r`qué hace`],
// - El comando se escribe tal cual (comillas y \ incluidas). Puede ocupar varias líneas.
// - En "qué hace" puedes usar <code> y <strong>; para escribir un < suelto, pon &lt;
// - Lo único que no admite el texto es el acento grave (`) y la pareja ${
// - Para un tema nuevo, añade otro bloque { asig, seccion, tema, lista }. La sección tiene que estar en ASIGNATURAS.
const r = String.raw;

// ASIGNATURAS Y SECCIONES, en el orden en que salen en la web.
// Una sección sin comandos ni apuntes sale como "vacía" hasta que le pongas algo.
const ASIGNATURAS = [
  { siglas: "ISO", icono: "🖥️", nombre: "Implantación de Sistemas Operativos",
    desc: "Instalación, configuración y administración de Linux y Windows Server. Virtualización con VirtualBox y Proxmox.",
    secciones: ["Intro y virtualización", "Linux básico", "Linux avanzado", "PowerShell básico", "PowerShell avanzado", "Dominios Windows y Linux"] },
  { siglas: "PAR", icono: "🌐", nombre: "Planificación y Administración de Redes",
    desc: "Fundamentos de comunicaciones, modelo OSI/TCP-IP, direccionamiento IP, subnetting y configuración de dispositivos de red.",
    secciones: ["Fundamentos", "Cisco básico", "Switches", "Routers", "Enrutamiento", "Captura de tráfico"] },
  { siglas: "GBD", icono: "🗄️", nombre: "Gestión de Bases de Datos",
    desc: "Diseño relacional, SQL, administración de sistemas gestores (MySQL / MariaDB) y copias de seguridad.",
    secciones: ["Elementos de las BD", "Modelos lógicos", "Diseño físico (DDL)", "Consultas", "Modificación (DML)", "Seguridad de datos"] },
  { siglas: "FH", icono: "🔧", nombre: "Fundamentos de Hardware",
    desc: "Componentes internos del PC, ensamblado, mantenimiento preventivo/correctivo y periféricos.",
    secciones: ["Componentes", "CPD y servidores", "Copias y clonación", "Taller"] },
  { siglas: "LM", icono: "📄", nombre: "Lenguajes de Marcas",
    desc: "HTML5, CSS3, XML, JSON y herramientas de transformación. Estructuración y presentación de documentos web.",
    secciones: ["XML y DTD", "XSD", "XPath y XQuery", "XSLT y XSL-FO", "HTML", "CSS", "JavaScript"] },
  { siglas: "SOST", icono: "🌱", nombre: "Sostenibilidad",
    desc: "Criterios ASG, ODS, retos ambientales y sociales, economía circular y planes de sostenibilidad.",
    secciones: ["ASG y ODS", "Retos ambientales y sociales", "Desempeño profesional", "Economía circular", "Plan de sostenibilidad"] },
  { siglas: "DIG", icono: "⚡", nombre: "Digitalización",
    desc: "Entornos IT y OT, tecnologías habilitadoras, nube, inteligencia artificial, datos y ciberseguridad.",
    secciones: ["IT y OT", "Tecnologías habilitadoras", "La nube", "Inteligencia artificial", "Datos y seguridad", "Transformación digital"] },
  { siglas: "IPE1", icono: "🧭", nombre: "Itinerario Personal para la Empleabilidad 1",
    desc: "Prevención de riesgos, primeros auxilios, contratos, nómina, Seguridad Social y búsqueda de empleo.",
    secciones: ["Prevención de riesgos", "Emergencias y primeros auxilios", "Contrato y convenio", "Nómina y Seguridad Social", "Orientación y empleo"] },
];

const COMANDOS = [
  // ───────────────────────────── ISO · LINUX ─────────────────────────────
  { asig: "ISO", seccion: "Linux básico", tema: "Sistema", lista: [
    [r`uname -a`, r`Muestra todos los datos del sistema (kernel, versión, nombre del host, etc). Usar <code>uname -r</code> solo para ver la versión del kernel.`],
    [r`cat /etc/os-release`, r`Muestra la versión exacta de la distribución. Vale en Debian y en Ubuntu (<code>/etc/lsb-release</code> no viene por defecto en Debian). Para ver la versión del entorno gráfico usar <code>gnome-shell --version</code>.`],
    [r`lscpu`, r`Muestra los detalles completos sobre la CPU. (Para ver solo la arquitectura, usar el comando <code>arch</code>).`],
    [r`echo $XDG_SESSION_TYPE`, r`Sirve para ver si el entorno gráfico actual está utilizando X Window (X11) o Wayland.`],
    [r`date "+%A %d de %B de %Y"`, r`Muestra la fecha formateada (ej. "martes 24 de diciembre de 2024"). Para cambiar la fecha real del sistema se usa <code>date --set="Año-mes-dia hora:min"</code>.`],
    [r`history`, r`Historial de comandos. <code>!25</code> vuelve a ejecutar el número 25. El historial permanente está en <code>~/.bash_history</code>.`],
    [r`history -c && cat /dev/null > ~/.bash_history`, r`Borra el historial: el de la sesión (<code>history -c</code>) y el permanente (vaciando el archivo).`],
    [r`man ls`, r`Manual del comando con todas sus opciones.`],
    [r`whatis ls`, r`Descripción de una línea del comando.`],
    [r`apropos palabra`, r`Dice qué comandos tienen que ver con esa palabra.`],
    [r`echo $SHELL`, r`Muestra tu intérprete de comandos por defecto.`],
    [r`sudo dmesg`, r`Diagnóstico del arranque y del hardware (mensajes del kernel).`],
  ]},
  { asig: "ISO", seccion: "Linux básico", tema: "Procesos", lista: [
    [r`sudo ps aux`, r`Muestra todos los procesos del sistema. Si quieres buscar uno en específico, puedes filtrarlo con tuberías: <code>sudo ps aux | grep "X"</code>.`],
    [r`sudo kill -9 1234`, r`Termina a la fuerza el proceso con ese PID (por ejemplo, si una ventana se queda bloqueada). El PID se saca con <code>ps aux</code>.`],
  ]},
  { asig: "ISO", seccion: "Linux básico", tema: "Sesiones y apagado", lista: [
    [r`su - user`, r`Cambia al usuario <code>user</code>. El guion <code>-</code> es crítico: <strong>abre una shell de login con su entorno y variables completos</strong> (su PATH, su home...). Si solo pones <code>su</code>, mantienes las variables del usuario anterior.`],
    [r`whoami`, r`Muestra qué usuario activo está ejecutando la sesión o un script.`],
    [r`w`, r`Muestra los usuarios conectados al equipo y el tiempo de inactividad (idle) de cada sesión. Similar a usar <code>who</code>.`],
    [r`last`, r`Muestra los últimos inicios de sesión. En Debian 13 ya no viene: instala <code>wtmpdb</code> y usa <code>wtmpdb last</code>.`],
    [r`tty`, r`Muestra el nombre del archivo del terminal en sí que estás usando en ese momento (ej. <code>/dev/pts/0</code>).`],
    [r`shutdown -h now`, r`Apaga el sistema instantáneamente (Equivalente a <code>poweroff</code>).`],
    [r`sudo su -`, r`Entrar como root, con su entorno, para no poner sudo en cada comando.`],
    [r`exit`, r`Cerrar la sesión.`],
    [r`who`, r`Usuarios conectados al equipo (y la IP si es por red).`],
    [r`shutdown -h +10`, r`Apagar dentro de 10 minutos. También admite una hora: <code>shutdown -h 22:30</code>. <code>shutdown -c</code> lo cancela.`],
    [r`systemctl reboot`, r`Reinicia el equipo de forma ordenada.`],
    [r`reboot -f`, r`Reinicio forzado: no cierra los servicios con normalidad. Solo si no queda otra.`],
    [r`mesg y`, r`Aceptar mensajes de otros usuarios en la terminal.`],
  ]},
  { asig: "ISO", seccion: "Linux básico", tema: "Ficheros", lista: [
    [r`ls -la`, r`Ver archivos. <code>-a</code> muestra todos los archivos (incluso ocultos), y <code>-l</code> aporta más información (permisos, propietario, peso).`],
    [r`tree`, r`Muestra los contenidos del directorio de forma visual jerárquica (como un árbol).`],
    [r`./script.sh`, r`<strong>¿Por qué se pone el punto y barra?</strong> Al ejecutar algo, Linux busca en tu PATH (como <code>/bin</code>). Para decirle "Ejecuta ESTO que tengo justo en la carpeta en la que estoy ahora mismo", usas <code>./</code>`],
    [r`wc -l archivo.txt`, r`Cuenta el número de líneas (<code>-l</code>), palabras o caracteres de un archivo (Word Count).`],
    [r`nl archivo.txt`, r`Muestra el contenido del archivo numerando sus líneas en pantalla.`],
    [r`ls -lh archivo`, r`Muestra cuánto ocupa, en formato legible.`],
    [r`ls -R`, r`Muestra el contenido de la carpeta y el de todas sus subcarpetas.`],
    [r`ls -dlh carpeta`, r`Propiedades de la carpeta en sí (permisos, dueño, grupo), NO de su contenido.`],
    [r`ls -i archivo`, r`Ver el inodo de un archivo.`],
    [r`touch archivo`, r`Crea un archivo vacío.`],
    [r`mkdir -p carpeta/subcarpeta`, r`Crea directorios. Con <code>-p</code> crea también los intermedios que no existan.`],
    [r`cp -r origen destino`, r`Copiar. Sin <code>-r</code> solo copia archivos; con <code>-r</code>, carpetas enteras. Si el destino no existe lo crea con el contenido; si ya existe, mete dentro la carpeta de origen.`],
    [r`mv origen destino`, r`Mover. Si origen y destino están en la misma carpeta, lo que hace es renombrar.`],
    [r`rm -r carpeta`, r`Borrar una carpeta y lo que tiene dentro. <code>-i</code> pregunta antes de cada borrado; <code>-f</code> no pregunta nada ni da error si no existe.`],
    [r`rm -rf carpeta/*`, r`Borrar el contenido de una carpeta sin borrar la carpeta. ⚠️ No hay papelera: revisa la ruta antes.`],
    [r`ln origen enlace`, r`Enlace duro: otro nombre para el mismo inodo.`],
    [r`ln -s origen enlace`, r`Enlace blando (simbólico): apunta a la ruta.`],
    [r`find /home/usuario -iname "*.tmp"`, r`Busca por nombre sin distinguir mayúsculas (<code>-iname</code>). Se puede filtrar por dueño con <code>-user nombre</code>. Si no pones ruta, busca en la carpeta actual.`],
    [r`find . -iname "mate*" -exec mv {} /home/usuario/apuntes \;`, r`Busca y hace algo con cada resultado: <code>{}</code> es el archivo encontrado y <code>\;</code> cierra la orden. Para borrar: <code>-exec rm -rf {} \;</code>`],
    [r`diff -y archivo1 archivo2`, r`Diferencias entre dos archivos en columnas. <code>-q</code> solo dice si son distintos; <code>-w</code> ignora los espacios.`],
    [r`file archivo`, r`Dice qué tipo de archivo es.`],
    [r`du -hs carpeta`, r`Cuánto ocupa la carpeta en total.`],
    [r`comando | less`, r`Para cuando la salida no cabe en pantalla: deja subir, bajar y buscar (<code>/texto</code>). <code>more</code> es parecido, más limitado.`],
    [r`echo "texto" >> archivo`, r`Añade texto al final del archivo. Con un solo <code>></code> lo sobrescribe. Vale con cualquier comando, no solo con echo.`],
  ]},
  { asig: "ISO", seccion: "Linux básico", tema: "Filtros y texto", lista: [
    [r`grep -rn "upload" /etc/`, r`Busca la palabra "upload" de forma recursiva (<code>-r</code>) en todos los archivos del directorio, mostrando el número de línea (<code>-n</code>). (Muy útil en prácticas de Moodle o WordPress).`],
    [r`grep "fin$" /etc/passwd`, r`Filtro de búsqueda. El símbolo <code>$</code> significa que la línea debe <strong>terminar</strong> por la palabra "fin". (El circunflejo <code>^</code> indica que debe <strong>empezar</strong>).`],
    [r`sed -i 's/antiguo/nuevo/g' fichero.txt`, r`Reemplaza texto. La letra <code>g</code> (global) cambia TODAS las coincidencias de la línea. El <code>-i</code> (<em>in-place</em>) <strong>sobrescribe</strong> directamente el archivo original.`],
    [r`awk -F: '$2!="ES" {print $1}' fichero.txt`, r`Extrae campos. Define los dos puntos <code>-F:</code> como separador de columnas.`],
    [r`cut -d: -f1 usuarios.txt`, r`Extrae caracteres o columnas. Usa los dos puntos como delimitador (<code>-d:</code>) y extrae únicamente el primer campo (<code>-f1</code>).`],
    [r`cat /etc/nanorc | grep -v "^#" | grep -v "^$"`, r`Muestra un archivo de configuración sin comentarios (<code>^#</code>) ni líneas en blanco (<code>^$</code>). <code>-v</code> invierte la búsqueda.`],
    [r`tr -d " " < datos.txt > datos_final.txt`, r`Elimina todos los espacios y guarda el resultado en otro archivo.`],
    [r`tr ";" ":" < datos.txt`, r`Sustituye un carácter por otro (aquí, los <code>;</code> por <code>:</code>).`],
    [r`sed 's/192.168.1/10.0.0/' red.txt > red_nuevo.txt`, r`Cambia un texto por otro y lo guarda en otro archivo, sin tocar el original.`],
    [r`tail -f /var/log/auth.log`, r`Se ve en directo lo que se va escribiendo en el archivo. (En Debian actual puede que no exista: usa <code>journalctl -f</code>).`],
    [r`sudo dmesg | tail -n 3 > archivo.txt`, r`Guarda en un archivo las tres últimas líneas. Para las primeras: <code>head -n 3</code>.`],
    [r`sort archivo -o archivo`, r`Ordena líneas. Con <code>-o</code> puede sobrescribir el mismo archivo; con <code>></code> lo dejarías vacío.`],
    [r`cut -d: -f2,4 comerciales | sort -t: -k2n`, r`Saca los campos 2 y 4 y ordena por el segundo como número (<code>-k2n</code>). <code>cut</code> no cambia el orden de los campos ni filtra: para eso, awk.`],
    [r`paste -d: nombres correos departamentos`, r`Junta varios archivos línea a línea, separando con <code>:</code> (por defecto, tabulador).`],
    [r`awk -F: '$3>=1000 && $3<=2000 {print $1" - "$3}' /etc/passwd`, r`awk extrae campos en el orden que quieras y con condiciones. Este lista los usuarios creados por personas (UID entre 1000 y 2000). Sin <code>-F</code>, separa por espacios y tabuladores.`],
    [r`awk '{print substr($0, 4, 5)}' archivo`, r`Extrae caracteres: de toda la línea (<code>$0</code>), desde el carácter 4, cinco caracteres.`],
  ]},
  { asig: "ISO", seccion: "Linux básico", tema: "Comprimir", lista: [
    [r`tar -czvf archivo.tar.gz origen/`, r`Crea (<code>c</code>) paquete tar y comprime con gzip (<code>z</code>) mostrando progreso (<code>v</code>).`],
    [r`tar -xzvf archivo.tar.gz -C destino/`, r`Extrae (<code>x</code>) y descomprime, enviando el contenido a la carpeta <code>destino/</code>.`],
    [r`tar -cvf archivo.tar origen/`, r`Solo empaquetar, sin comprimir. Ver contenido: <code>tar -tvf</code>. Extraer: <code>tar -xvf archivo.tar -C destino</code>.`],
    [r`tar -ztvf archivo.tar.gz`, r`Ver el contenido de un tar.gz sin extraerlo.`],
    [r`gzip archivo`, r`Comprime y <strong>borra el original</strong>. Ver: <code>gzip -l archivo.gz</code>. Descomprimir: <code>gzip -d archivo.gz</code>.`],
    [r`zip -r nombre.zip carpeta/`, r`Comprime varios archivos o carpetas (<code>-r</code>) sin borrar los originales. Ver: <code>unzip -v nombre.zip</code>.`],
    [r`unzip nombre.zip -d destino/`, r`Descomprime un zip en otra carpeta.`],
    [r`bzip2 archivo`, r`Comprime (más que gzip) y borra el original. Descomprimir: <code>bzip2 -d archivo.bz2</code>.`],
  ]},
  { asig: "ISO", seccion: "Linux básico", tema: "Usuarios y permisos", lista: [
    [r`sudo adduser heidi`, r`Crea un nuevo usuario de forma interactiva. Crea su home y pide datos/contraseña.`],
    [r`sudo addgroup ventas`, r`Crea un nuevo grupo en el sistema.`],
    [r`sudo adduser heidi ventas`, r`Añade un usuario existente a un grupo existente.`],
    [r`sudo userdel -r heidi`, r`Borra al usuario y sus archivos/directorio personal por completo (<code>-r</code>).`],
    [r`sudo groupdel ventas`, r`Borra un grupo del sistema.`],
    [r`getent passwd`, r`Permite ver a los usuarios registrados en el sistema.`],
    [r`passwd user`, r`Cambio de contraseña. [Desde root, <code>passwd user</code> cambia la contraseña de user directamente].`],
    [r`id usuario`, r`Muestra el UID, el GID y los grupos. <code>-u</code> solo el UID; <code>-g</code> solo el GID.`],
    [r`sudo deluser usuario grupo`, r`Quita a un usuario de un grupo.`],
    [r`getent group grupo`, r`Ver los integrantes de un grupo.`],
    [r`chmod u+x,g-w,o=r archivo`, r`Cambia permisos con letras: a quién (<code>u</code> usuario, <code>g</code> grupo, <code>o</code> otros, <code>a</code> todos), <code>+</code> da, <code>-</code> quita, <code>=</code> deja exactamente eso.`],
    [r`chmod 775 archivo`, r`Permisos con números: un dígito para usuario, grupo y otros, sumando r=4, w=2, x=1. Así un script se puede lanzar con <code>./script.sh</code>.`],
    [r`chmod -R 750 carpeta`, r`Lo aplica también a todo lo que hay dentro. En una carpeta, la <code>x</code> significa poder entrar.`],
    [r`sudo chmod o+t carpeta`, r`Sticky bit: en una carpeta donde todos escriben, cada uno solo puede borrar lo suyo (como <code>/tmp</code>).`],
    [r`sudo chown usuario:grupo archivo`, r`Cambia el dueño y el grupo. Con <code>-R</code>, también lo de dentro.`],
    [r`chgrp grupo archivo`, r`Cambia el grupo. Sin ser root, solo a un grupo al que pertenezcas.`],
    [r`umask`, r`Muestra la máscara: lo que se <em>resta</em> a los permisos por defecto (666 archivos, 777 carpetas). Con 002, un archivo nace con 664.`],
    [r`umask 006`, r`Cambia la máscara (los archivos nacerán con 660). Para que sea permanente, ponlo al final de <code>~/.bashrc</code>.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "Variables y scripts", lista: [
    [r`echo $HOME`, r`Las variables de entorno en Linux van en mayúsculas (por convención). Esta te dice cuál es tu directorio de trabajo principal asignado.`],
    [r`export PATH=$PATH:/home/heidi/mis_scripts`, r`Añade una nueva carpeta al PATH. Para que el cambio sea permanente, debe añadirse al archivo oculto <code>~/.bashrc</code> de tu usuario.`],
    [r`alias ll='ls -la'`, r`Crea un alias temporal. <code>alias</code> solo los lista y <code>unalias ll</code> lo quita. Para que sea permanente, ponlo en <code>~/.bashrc</code>.`],
    [r`source ~/.bashrc`, r`Vuelve a leer el archivo sin cerrar la terminal.`],
    [r`echo $PATH | tr ":" "\n"`, r`Muestra una carpeta del PATH por línea, en el orden en que se buscan los programas.`],
    [r`echo 'export PATH=$PATH:/opt/programa' >> ~/.bashrc`, r`Añade la carpeta al PATH de forma permanente. Con comillas simples para que <code>$PATH</code> no se resuelva al guardarlo.`],
    [r`#!/bin/bash`, r`Primera línea de un script: dice qué intérprete lo ejecuta.`],
    [r`bash script.sh`, r`Ejecuta un script aunque no tenga permiso de ejecución. Con <code>sh</code>, en Debian y Ubuntu, lo ejecuta <code>dash</code>, y lo propio de Bash falla.`],
    [r`read -p "Pulsa intro para seguir" x`, r`En un script, se para y espera a que el usuario escriba; lo guarda en la variable.`],
  ]},
  { asig: "ISO", seccion: "Linux básico", tema: "Paquetes", lista: [
    [r`sudo apt update`, r`Actualiza la lista local de repositorios (no instala nada, solo mira qué hay de nuevo).`],
    [r`sudo apt upgrade`, r`Descarga e instala las últimas versiones de los programas basados en el update anterior.`],
    [r`sudo apt install htop`, r`Descarga el programa de los repositorios y lo instala resolviendo las dependencias automáticamente.`],
    [r`sudo apt install ./archivo.deb`, r`Instala un <code>.deb</code> descargado resolviendo sus dependencias. El <code>./</code> le dice a apt que es un archivo de esta carpeta y no un paquete del repositorio.`],
    [r`sudo apt purge X`, r`Desinstala el programa X borrando también sus archivos de configuración.`],
    [r`wget https://web.com/archivo.zip`, r`Descarga archivos directamente desde internet a través de la terminal.`],
    [r`apt policy tree`, r`Dice si el paquete está en los repositorios, en cuál y si está instalado.`],
    [r`sudo dpkg -i archivo.deb`, r`Instala un .deb. Es más básico: no resuelve dependencias.`],
    [r`sudo snap install programa`, r`Instala un paquete aislado del sistema: si se cuelga, no se lleva el sistema por delante.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "Discos", lista: [
    [r`sudo fdisk -l`, r`Lista detalladamente todas las particiones de todos los discos conectados al sistema.`],
    [r`fdisk`, r`Herramienta clásica en CLI para manipular tablas de particiones, pensada para <strong>MBR</strong> (las versiones actuales también manejan GPT).`],
    [r`gdisk`, r`Equivalente a fdisk pero diseñado específicamente para gestionar discos y particiones con formato <strong>GPT</strong>.`],
    [r`sudo mount /dev/sdb1 /mnt/usb`, r`Monta un dispositivo de bloques en una carpeta para poder acceder a sus archivos. Todo lo montado con este comando se pierde al reiniciar a menos que se configure en <code>/etc/fstab</code>.`],
    [r`lsblk`, r`Ver discos, particiones y dónde están montados.`],
    [r`df -hT`, r`Sistemas de ficheros montados, con su tipo y espacio libre.`],
    [r`sudo umount /mnt/usb`, r`Desmontar.`],
    [r`sudo mount -a`, r`Monta todo lo que hay en <code>/etc/fstab</code>. Sirve para comprobarlo sin reiniciar.`],
    [r`sudo mkfs.ext4 /dev/sdb1`, r`Formatea la partición en ext4. ⚠️ Borra lo que hubiera.`],
    [r`sudo fdisk /dev/sdb`, r`Particionar. Dentro: <code>n</code> nueva, <code>t</code> cambiar tipo, <code>p</code> ver, <code>d</code> borrar, <code>w</code> guardar, <code>q</code> salir sin guardar.`],
    [r`sudo mkfs.ntfs -f /dev/sdb2`, r`Formatea en NTFS. Con <code>-f</code> es rápido. (En ext4, forzar es <code>-F</code> mayúscula).`],
    [r`sudo fsck /dev/sdb1`, r`Comprueba y repara. Nunca sobre una partición montada.`],
    [r`sudo blkid /dev/sdb1`, r`UUID y tipo de una partición, para <code>/etc/fstab</code>.`],
    [r`UUID=1234-abcd  /mnt/datos1  ext4  defaults  0  2`, r`Línea de <code>/etc/fstab</code>: qué, dónde, tipo, opciones, copia y orden de revisión. <code>user</code>: lo desmonta solo quien lo montó; <code>users</code>: cualquiera. Haz una copia de fstab antes y prueba con <code>mount -a</code>.`],
    [r`sudo chgrp grupo1 /mnt/datos
sudo chmod 2770 /mnt/datos`, r`Carpeta compartida por un grupo: el 2 (setgid) hace que lo que se cree dentro sea del grupo.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "Redes", lista: [
    [r`ip a`, r`Muestra la configuración de las interfaces de red (IP, máscara de subred, estado).`],
    [r`ip r`, r`Muestra la tabla de enrutamiento, permitiendo ver cuál es la <strong>Puerta de enlace (Gateway)</strong> por defecto.`],
    [r`ping -c 4 google.es`, r`Envía exactamente 4 paquetes ICMP (<code>-c 4</code>) para comprobar la conectividad exterior con Google.`],
    [r`nslookup google.es`, r`Verifica si el sistema de resolución de nombres (DNS) está funcionando correctamente resolviendo el dominio a IP. También existe en Windows.`],
    [r`sudo hostnamectl set-hostname "nombre"`, r`Cambia el nombre del equipo sin reiniciar, en Debian y Ubuntu. Cámbialo también en <code>/etc/hosts</code>.`],
    [r`sudo ip link set enp0s3 up`, r`Levanta (<code>up</code>) o baja (<code>down</code>) una tarjeta de red concreta. Vale en cualquier distribución.`],
    [r`sudo ifdown enp0s3`, r`Baja la tarjeta de red (en Debian). ⚠️ Si estás conectado por SSH a través de ella, te quedas fuera.`],
    [r`sudo ifup enp0s3`, r`Levanta la tarjeta de red (en Debian).`],
    [r`cat /etc/resolv.conf`, r`Permite sacar y ver los DNS configurados en el sistema (en Debian).`],
    [r`sudo netplan apply`, r`Los cambios de red se aplican automáticamente en Ubuntu al ejecutar este comando.`],
    [r`resolvectl status`, r`Permite comprobar el estado y los DNS en Ubuntu.`],
    [r`curl localhost`, r`Muestra lo que tenga el servidor alojado como HTML.`],
    [r`curl -I web.com`, r`Muestra solo la cabecera del enlace (códigos 200, 404, etc).`],
    [r`sudo ip a flush dev enp0s3`, r`Borra la IP de la tarjeta.`],
    [r`sudo dhclient enp0s3`, r`Pide una IP por DHCP (paquete <code>isc-dhcp-client</code>, ya sin mantenimiento). Debian 13 trae <code>dhcpcd</code>.`],
    [r`sudo systemctl restart networking.service`, r`Aplica los cambios de <code>/etc/network/interfaces</code> en Debian.`],
    [r`resolvectl dns`, r`Ver quién resuelve los DNS en Ubuntu.`],
    [r`ss -a | grep nfs`, r`Conexiones y sockets de red; aquí, filtrando por un servicio.`],
    [r`rpcinfo -p`, r`Servicios RPC registrados (los usa NFS).`],
    [r`auto enp0s3
iface enp0s3 inet static
    address 192.168.1.10/24
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4`, r`IP fija en Debian, en <code>/etc/network/interfaces</code>. <code>dns-nameservers</code> necesita el paquete <code>resolvconf</code>; si no, los DNS van en <code>/etc/resolv.conf</code>. Con varias tarjetas, gateway y DNS solo en una.`],
    [r`nameserver 8.8.8.8
nameserver 8.8.4.4`, r`DNS en <code>/etc/resolv.conf</code>.`],
    [r`network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: false
      addresses: [192.168.1.10/24]
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]`, r`IP fija en Ubuntu Server, en un <code>.yaml</code> de <code>/etc/netplan/</code>. Solo espacios, nunca tabuladores. Se aplica con <code>sudo netplan apply</code>.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "SSH y copia remota", lista: [
    [r`ssh-keygen`, r`Paso 1: genera una clave pública y otra privada (se guarda por defecto en <code>.ssh/</code>).`],
    [r`ssh-copy-id usu@IP`, r`Paso 2: le pasa la clave pública al archivo <code>authorized_keys</code> del servidor.`],
    [r`ssh usu@IP`, r`Paso 3: te conectas directamente. El servidor valida tu identidad matemáticamente.`],
    [r`scp archivo usu@IP:/ruta`, r`Copiar archivo(s) de mi máquina a la otra (al servidor remoto).`],
    [r`scp usu@IP:/ruta ./`, r`Copiar archivo desde el servidor remoto a mi ordenador local.`],
    [r`sudo systemctl status ssh.service ssh.socket`, r`Estado de los dos servicios de SSH.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "Usuarios y sudo", lista: [
    [r`sudo useradd -m -s /bin/bash heidi`, r`Crea un usuario sin preguntar: <code>-m</code> le crea el home y <code>-s</code> le pone el shell. (<code>adduser</code> es la versión interactiva).`],
    [r`sudo usermod -aG sudo heidi`, r`Añade al usuario a un grupo sin sacarlo de los que ya tiene (<code>-a</code>). <code>-L</code> lo bloquea y <code>-U</code> lo desbloquea.`],
    [r`groups heidi`, r`Grupos a los que pertenece.`],
    [r`sudo groupmod -n nuevo viejo`, r`Cambia el nombre de un grupo.`],
    [r`newgrp ventas`, r`Cambia temporalmente el grupo principal de la sesión: lo que crees será de ese grupo.`],
    [r`sudo chage -M 90 -m 7 -W 5 heidi`, r`Caducidad de la contraseña: máximo 90 días, mínimo 7, aviso 5 días antes. <code>-E fecha</code> caduca la cuenta, <code>-I días</code> la desactiva tras caducar y <code>-l</code> muestra lo que tiene.`],
    [r`sudo getent shadow`, r`Contraseñas cifradas y su caducidad (<code>/etc/shadow</code>). El tercer campo son los días desde el 1/1/1970 hasta el último cambio.`],
    [r`mkpasswd -m sha-512`, r`Genera una contraseña cifrada (paquete <code>whois</code>). <code>-m</code> elige el método.`],
    [r`sudo visudo`, r`Edita <code>/etc/sudoers</code> comprobando la sintaxis antes de guardar. <code>!</code> delante de un comando lo deniega.`],
    [r`sudo visudo -c`, r`Solo comprueba la sintaxis de sudoers.`],
    [r`%ventas ALL=(ALL) /usr/sbin/adduser, !/usr/sbin/adduser root`, r`Línea de sudoers: el grupo (<code>%</code>) puede usar ese comando con sudo, menos el que lleva <code>!</code>. Edítalo siempre con <code>visudo</code>.`],
    [r`sudo useradd -m -s /bin/bash -p "$(mkpasswd -m sha-512 clave)" gato`, r`Crea un usuario con contraseña en una línea. La contraseña se ve en el historial: solo para scripts de prácticas.`],
    [r`#!/bin/bash
while IFS=: read -r nombre clave; do
  if id "$nombre" &>/dev/null; then
    echo "$nombre ya existe"
  else
    useradd -m -s /bin/bash "$nombre"
    echo "$nombre:$clave" | chpasswd
  fi
done < /root/usuarios.csv`, r`Creación masiva de usuarios desde un archivo con líneas <code>nombre:clave</code>. Se lanza como root.`],
    [r`#!/bin/bash
while IFS=: read -r nombre clave; do
  userdel -r "$nombre"
done < /root/usuarios.csv`, r`Eliminación masiva con el mismo archivo. <code>-r</code> borra también su carpeta.`],
    [r`sudo -l`, r`Qué puedes hacer con sudo.`],
    [r`Cmnd_Alias RED = /bin/ip, /bin/systemctl restart networking
%tecnicos ALL=(ALL) RED`, r`Alias de comandos en sudoers (en mayúsculas) y regla para un grupo. El formato es <code>quién equipo=(como quién) qué</code>.`],
    [r`%tecnicos ALL=(ALL) NOPASSWD: RED`, r`Sin pedir contraseña.`],
    [r`%tecnicos ALL=(ALL) sudoedit /etc/network/interfaces`, r`Dejar editar un archivo. Mejor <code>sudoedit</code> que permitir <code>nano</code>: desde nano como root se puede abrir una consola.`],
    [r`Defaults passwd_tries=2`, r`Intentos para escribir bien la contraseña.`],
    [r`%tecnicos ALL=(ALL) /usr/bin/passwd [A-Za-z]*, !/usr/bin/passwd root`, r`Cambiar la contraseña de otros pero no la de root. ⚠️ Denegar con <code>!</code> no es seguro del todo: casi siempre hay otra forma de escribirlo.`],
    [r`sudo cp /etc/sudoers /etc/sudoers.ORIGINAL`, r`Copia de seguridad antes de tocarlo.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "Procesos", lista: [
    [r`ps u -u heidi`, r`Procesos de un usuario.`],
    [r`top`, r`Procesos en vivo. <code>htop</code> es más visual (hay que instalarlo).`],
    [r`comando &`, r`Lo ejecuta en segundo plano. En primer plano, <code>Ctrl+C</code> lo cancela y <code>Ctrl+Z</code> lo suspende.`],
    [r`jobs`, r`Trabajos en segundo plano o suspendidos, con su número.`],
    [r`bg %1`, r`Reanuda en segundo plano el trabajo 1.`],
    [r`fg %1`, r`Trae a primer plano el trabajo 1.`],
    [r`kill -15 1234`, r`Pide al proceso que termine y le deja acabar. <code>kill -9</code> lo mata sin más. <code>kill -l</code> lista las señales.`],
    [r`killall -9 nombre`, r`Mata todos los procesos con ese nombre.`],
    [r`sudo pkill -9 -u heidi`, r`Mata todos los procesos de un usuario (lo echa del sistema).`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "Servicios", lista: [
    [r`systemctl status ssh`, r`Estado de un servicio. systemctl es el intermediario para hablar con systemd.`],
    [r`sudo systemctl start ssh`, r`Lo arranca ahora. <code>stop</code> lo para y <code>restart</code> lo reinicia. No cambia si arranca con la máquina.`],
    [r`sudo systemctl enable ssh`, r`Hace que arranque con la máquina. <code>disable</code> lo evita. Con <code>--now</code>, además lo arranca o para ya.`],
    [r`systemctl list-unit-files -t service`, r`Todos los servicios instalados. Sin <code>-t service</code>, todas las unidades.`],
    [r`systemctl list-units -t service`, r`Servicios cargados o activos ahora.`],
    [r`sudo systemctl daemon-reload`, r`Vuelve a leer los archivos de systemd después de modificarlos.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "Samba", lista: [
    [r`testparm`, r`Comprueba que <code>/etc/samba/smb.conf</code> no tiene errores.`],
    [r`sudo smbpasswd -a heidi`, r`Da de alta en Samba a un usuario que ya existe en el sistema (la contraseña puede ser distinta). <code>-x</code> lo elimina y <code>-n</code> lo deja sin contraseña.`],
    [r`sudo pdbedit -L`, r`Ver todos los usuarios de Samba.`],
    [r`sudo smbstatus`, r`Conexiones y bloqueos. <code>-b</code> resumido, <code>-S</code> recursos compartidos, <code>-v</code> detallado.`],
    [r`[compartido]
   path = /srv/compartido
   valid users = @ventas
   read only = no
   browseable = yes`, r`Recurso en <code>/etc/samba/smb.conf</code>. Los permisos de Linux mandan sobre los de Samba. Después: <code>sudo systemctl restart smbd</code>.`],
    [r`sudo apt install samba`, r`Servidor Samba. El servicio es <code>smbd</code>.`],
    [r`[apuntes]
   comment = Solo lectura para todos
   path = /mnt/apuntes
   guest ok = yes
   read only = yes
   browseable = yes
   create mask = 0660
   directory mask = 0770`, r`Recurso público de solo lectura. <code>create mask</code> y <code>directory mask</code> son los permisos de lo que se crea dentro.`],
    [r`smbclient -L //192.168.1.10 -U heidi`, r`Desde Linux, recursos que comparte un servidor (paquete <code>smbclient</code>).`],
    [r`sudo mount -t cifs //192.168.1.10/apuntes /mnt/apuntes -o username=heidi`, r`Montar en Linux un recurso Samba o de Windows (paquete <code>cifs-utils</code>). En Windows: <code>\\192.168.1.10\apuntes</code>.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "NFS", lista: [
    [r`sudo apt install nfs-kernel-server`, r`Servidor NFS. En el cliente: <code>nfs-common</code>. Los recursos se declaran en <code>/etc/exports</code>.`],
    [r`sudo exportfs -av`, r`Lee <code>/etc/exports</code>, exporta todo (<code>-a</code>) y lo muestra (<code>-v</code>).`],
    [r`showmount -e localhost`, r`Carpetas que exporta un servidor NFS (con su IP, desde el cliente).`],
    [r`/srv/nfs 192.168.1.0/24(rw,sync,no_subtree_check)`, r`Línea de <code>/etc/exports</code>: carpeta, quién puede y con qué opciones. Sin espacio antes del paréntesis.`],
    [r`sudo mount -t nfs 192.168.1.10:/srv/nfs /mnt/nfs`, r`Montar en el cliente un recurso NFS.`],
    [r`/mnt/sugerencias 192.168.1.20(rw,sync,no_subtree_check,all_squash)`, r`Solo para un equipo y con todos convertidos en <code>nobody</code>. <code>root_squash</code> (por defecto) lo hace solo con root; <code>no_root_squash</code> lo quita. <code>async</code> es más rápido y menos seguro.`],
    [r`sudo systemctl restart nfs-kernel-server`, r`Aplica los cambios. <code>systemctl is-enabled nfs-kernel-server</code> dice si arranca con la máquina.`],
    [r`192.168.1.10:/mnt/documentos  /mnt/documentos  nfs  defaults  0  0`, r`Línea de <code>/etc/fstab</code> en el cliente. Después, <code>systemctl daemon-reload</code> y <code>mount -a</code>.`],
    [r`sudo exportfs -v`, r`Opciones reales con las que se exporta cada carpeta.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "Cuotas", lista: [
    [r`sudo mount -o remount /home`, r`Vuelve a montar <code>/home</code> para que coja las opciones <code>usrquota,grpquota</code> puestas en <code>/etc/fstab</code>.`],
    [r`sudo quotacheck -augmv`, r`Revisa las cuotas: <code>a</code> todos los sistemas, <code>u</code> usuarios, <code>g</code> grupos, <code>m</code> sin remontar en solo lectura, <code>v</code> detallado.`],
    [r`sudo quotaon -a`, r`Activa las cuotas. <code>quotaoff</code> las desactiva.`],
    [r`sudo edquota -u heidi`, r`Edita la cuota de un usuario (límites soft y hard). <code>-g grupo</code> para un grupo.`],
    [r`sudo edquota -t`, r`Edita el tiempo de gracia.`],
    [r`sudo edquota -p origen destino1 destino2`, r`Copia la cuota de un usuario a otros.`],
    [r`sudo repquota -s -a`, r`Informe de cuotas y de quién se ha pasado.`],
    [r`quota -gs`, r`Ver la cuota de tu grupo (no hace falta ser root).`],
    [r`/dev/sda3 /home ext4 defaults,usrquota,grpquota 0 2`, r`Línea de <code>/etc/fstab</code> que activa las cuotas de usuario y de grupo en <code>/home</code>.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "Volúmenes (LVM)", lista: [
    [r`sudo pvcreate /dev/sdb`, r`Paso 1: crea un volumen físico. Ver: <code>pvs</code> (resumen) o <code>pvdisplay</code> (detalle).`],
    [r`sudo vgcreate grupo1 /dev/sdb`, r`Paso 2: crea un grupo de volúmenes. Ver: <code>vgs</code> o <code>vgdisplay</code>.`],
    [r`sudo lvcreate -L 5G -n vol1 grupo1`, r`Paso 3: crea un volumen lógico. Ver: <code>lvs</code> o <code>lvdisplay</code>.`],
    [r`sudo mkfs.ext4 /dev/grupo1/vol1`, r`Paso 4: formatearlo. Después se monta como cualquier partición.`],
    [r`sudo vgextend grupo1 /dev/sdc`, r`Añade otro disco al grupo (antes, <code>pvcreate</code> sobre él).`],
    [r`sudo lvextend -L +2G /dev/grupo1/vol1`, r`Amplía el volumen lógico 2 GB.`],
    [r`sudo resize2fs /dev/grupo1/vol1`, r`Ajusta el sistema de ficheros al nuevo tamaño. Sin esto, el espacio añadido no se ve.`],
    [r`sudo lvcreate -L 1G -s -n copia-$(date +%d-%m-%Y) /dev/grupo1/vol1`, r`Instantánea (snapshot) con la fecha en el nombre.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "RAID", lista: [
    [r`sudo apt install mdadm`, r`Herramienta para RAID por software. Configuración: <code>/etc/mdadm/mdadm.conf</code>.`],
    [r`sudo mdadm -C /dev/md1 -l1 -n2 /dev/sdb /dev/sdc`, r`Crea un RAID: <code>-C</code> crear, <code>-l1</code> nivel (RAID 1), <code>-n2</code> número de discos. Para RAID 5: <code>-l5 -n3</code> con tres discos.`],
    [r`cat /proc/mdstat`, r`Estado de los RAID. <code>[UU]</code> todo bien; <code>[_U]</code> falla uno; <code>(S)</code> es el disco de reserva.`],
    [r`sudo mdadm --detail /dev/md1`, r`Detalle: nivel, discos y cuál está activo, de reserva o fallado.`],
    [r`sudo mdadm /dev/md1 -a /dev/sdd`, r`Añade un disco. Si el RAID está completo, queda de reserva (<em>hot spare</em>) y entra solo cuando falla otro.`],
    [r`sudo mdadm /dev/md1 -f /dev/sdb`, r`Marca un disco como fallado, para simular la avería. Después se quita con <code>-r /dev/sdb</code>.`],
    [r`sudo mkfs.ext4 /dev/md1
sudo mkdir /mnt/raid1
sudo mount /dev/md1 /mnt/raid1`, r`Formatear y montar el RAID, como cualquier disco.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "Hardware y módulos", lista: [
    [r`lsmod`, r`Módulos del núcleo cargados ahora, su tamaño y quién los usa.`],
    [r`modinfo e1000`, r`Información de un módulo: autor, dependencias, dónde está. <code>-d</code> solo la descripción.`],
    [r`sudo modprobe e1000`, r`Carga un módulo y sus dependencias. <code>-r</code> lo quita (si no está en uso) y <code>-v</code> lo explica. Es temporal.`],
    [r`find /lib/modules/$(uname -r) -name "*.ko*" | wc -l`, r`Cuántos módulos hay disponibles para tu núcleo.`],
    [r`cat /lib/modules/$(uname -r)/modules.builtin | grep e1000`, r`Comprueba si un módulo está integrado en el núcleo. Los integrados no se cargan ni se descargan.`],
    [r`echo e1000 | sudo tee /etc/modules-load.d/e1000.conf`, r`Carga el módulo en cada arranque. Para impedirlo: <code>blacklist e1000</code> en un archivo de <code>/etc/modprobe.d/</code>.`],
    [r`sudo dmesg | grep e1000`, r`Mensajes del núcleo sobre un módulo, para ver si dio errores.`],
    [r`lspci -k`, r`Dispositivos PCI y el módulo que usan (<em>Kernel driver in use</em>). Si no sale esa línea, no hay controlador cargado.`],
    [r`lsusb`, r`Dispositivos USB conectados.`],
    [r`cat /proc/cpuinfo`, r`Datos completos del procesador.`],
    [r`sudo lshw -short`, r`Resumen del hardware (hay que instalar <code>lshw</code>). En modo gráfico: <code>hardinfo</code>.`],
  ]},
  { asig: "ISO", seccion: "Linux avanzado", tema: "Impresoras (CUPS)", lista: [
    [r`sudo apt install cups`, r`Servidor de impresión. Se administra en <code>http://localhost:631</code>.`],
    [r`sudo usermod -aG lpadmin heidi`, r`Da permiso para administrar impresoras.`],
    [r`sudo apt install printer-driver-cups-pdf`, r`Impresora virtual que genera PDF: para practicar sin impresora.`],
    [r`sudo lpadmin -p virtual1 -E -v ipp://192.168.1.50/ipp/print -m everywhere`, r`Da de alta una impresora sin controlador (IPP Everywhere). Con un archivo del fabricante: <code>-P impresora.ppd</code>.`],
    [r`lpstat -p -d`, r`Impresoras y cuál es la predeterminada. <code>lpstat -t</code> lo enseña todo.`],
    [r`lp -d virtual1 documento.txt`, r`Manda a imprimir. <code>-n 2</code> son dos copias.`],
    [r`lpq -P virtual1`, r`Trabajos en cola.`],
    [r`cancel virtual1-12`, r`Cancela un trabajo; <code>cancel -a virtual1</code>, todos.`],
    [r`sudo cupsdisable virtual1`, r`Pausa la impresora. <code>cupsenable</code> la reanuda.`],
    [r`sudo lpadmin -x virtual1`, r`Elimina la impresora.`],
    [r`sudo lpadmin -p virtual1 -u deny:heidi`, r`Impide que un usuario imprima en ella.`],
    [r`sudo cupsctl --remote-admin --remote-any --share-printers`, r`Permite administrarla desde otro equipo y la comparte. Configuración: <code>/etc/cups/cupsd.conf</code>.`],
  ]},

  // ──────────────────────────── ISO · WINDOWS ────────────────────────────
  { asig: "ISO", seccion: "PowerShell básico", tema: "Primeros pasos", lista: [
    [r`$PSVersionTable`, r`Muestra información detallada sobre la versión exacta de PowerShell y el motor que estás ejecutando.`],
    [r`Get-Command Measure-*`, r`Busca todos los comandos disponibles en el sistema cuyo nombre empiece por "Measure". Ideal cuando no recuerdas el nombre exacto de un cmdlet.`],
    [r`Get-Help New-LocalUser -Examples`, r`El salvavidas. Muestra la ayuda del comando indicado y te enseña ejemplos prácticos reales de uso.`],
    [r`Get-Module`, r`Muestra los módulos cargados, que son conjuntos de comandos. Con <code>-ListAvailable</code>, todos los instalados.`],
    [r`Get-Date`, r`Muestra la fecha actual.`],
    [r`Clear-Host`, r`Limpia la pantalla de la terminal.`],
    [r`Write-Host "Texto"`, r`Escribe un mensaje por pantalla. Ojo: <code>echo</code> es alias de <code>Write-Output</code>, que además lo deja pasar por la tubería; <code>Write-Host</code> solo lo pinta.`],
    [r`Stop-Computer -Force`, r`Apaga el ordenador/servidor (el Force ignora si hay otras sesiones abiertas).`],
    [r`sconfig`, r`Menú de configuración de Windows Server.`],
  ]},
  { asig: "ISO", seccion: "PowerShell básico", tema: "Objetos y filtros", lista: [
    [r`Get-Process | Get-Member`, r`<code>Get-Member</code> se usa a través del pipe para ver todos los atributos, propiedades y métodos que tiene el objeto por debajo.`],
    [r`Select-Object NombreAtributo -First 5`, r`Elige columnas/atributos en específico. El parámetro <code>-First 5</code> muestra solo los primeros 5 resultados.`],
    [r`Get-Volume | Select-Object DriveLetter, @{Name="% Usado"; Exp={($_.Size - $_.SizeRemaining) / $_.Size * 100}}`, r`PowerShell es capaz de hacer matemáticas en vuelo dentro del pipeline. Aquí calculamos el porcentaje de disco usado basándonos en las propiedades reales.`],
    [r`Format-Table`, r`Alias <code>ft</code>. Muestra la salida en un formato de tabla limpia (Filas y Columnas).`],
    [r`Format-List`, r`Alias <code>fl</code>. Muestra la información en forma de lista (Ideal para ver <strong>todas</strong> las propiedades ocultas de un objeto).`],
    [r`Format-Wide`, r`Alias <code>fw</code>. Muestra una única propiedad repartida a lo ancho de toda la pantalla.`],
    [r`Get-Process | Where-Object CPU -gt 100`, r`Filtra por una condición (alias <code>?</code>). Comparadores: <code>-eq</code> <code>-ne</code> <code>-gt</code> <code>-ge</code> <code>-lt</code> <code>-le</code> <code>-like</code> <code>-match</code>.`],
    [r`Get-ChildItem -File | Where-Object { $_.Length -gt 10KB -and $_.Length -lt 1MB }`, r`Con varias condiciones hacen falta llaves y <code>$_</code> (el objeto actual): <code>-and</code>, <code>-or</code>, <code>-not</code>. Sin llaves solo admite una.`],
    [r`Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 Name, CPU`, r`Los 10 procesos que más CPU han usado. Ordena antes de dar formato.`],
    [r`Get-ChildItem -File -Recurse | Measure-Object Length -Sum -Average -Maximum -Minimum`, r`Cuántos archivos hay y cuánto ocupan: total, media, mayor y menor.`],
    [r`Get-ChildItem -Recurse -File -Filter "virus*" | ForEach-Object { $_.FullName }`, r`Hace algo con cada objeto (alias <code>%</code>).`],
    [r`Get-Process | Format-Table Name, @{Name="CPU"; Expression={$_.CPU}; FormatString="N2"}`, r`Columna calculada con dos decimales. <code>Format-*</code> solo cambia cómo se ve: ponlo siempre al final.`],
    [r`Get-Process | Select-Object Name, CPU | ConvertTo-Html -Title "Procesos" | Out-File procesos.html`, r`Exportar a una página web.`],
    [r`Get-Process | Select-Object Name, CPU | Export-Csv procesos.csv -NoTypeInformation`, r`Exportar a CSV. A XML: <code>Export-Clixml</code>.`],
    [r`Get-Process | Out-File procesos.txt -Append`, r`Guardar en un archivo. Como <code>>></code>, pero puedes elegir codificación y ancho.`],
  ]},
  { asig: "ISO", seccion: "PowerShell básico", tema: "Ficheros", lista: [
    [r`Get-PSDrive`, r`Muestra todas las unidades accesibles. No solo verás discos (FileSystem), sino que podrás navegar por el Registro de Windows (<code>HKCU:</code>), Variables de entorno (<code>Env:</code>) o Alias (<code>Alias:</code>) como si fueran carpetas normales.`],
    [r`Get-ChildItem`, r`Ver contenido de un directorio. Alias: <code>dir</code> / <code>ls</code>.`],
    [r`Get-ChildItem -Force`, r`El parámetro <code>-Force</code> es obligatorio para ver también los archivos ocultos. Si quieres ver <strong>solo</strong> los ocultos: <code>dir ruta -Attributes Hidden</code>.`],
    [r`Get-Location`, r`Ver ruta actual. Alias: <code>pwd</code>.`],
    [r`Set-Location ruta`, r`Cambiar de directorio. Alias: <code>cd</code>.`],
    [r`New-Item nombre`, r`Crea un archivo nuevo. Alias: <code>ni nombre</code>. Es el equivalente al <code>touch</code> de Linux (que en PowerShell no existe).`],
    [r`Set-ItemProperty "ruta" -Name Attributes -Value "ReadOnly"`, r`Modifica los atributos del archivo en específico.`],
    [r`Get-ChildItem -Filter *.log | Compress-Archive -DestinationPath .\logs.zip`, r`Busca todos los .log y los pasa por la tubería para comprimirlos en un fichero ZIP. <em>(Para descomprimir se usa <code>Expand-Archive</code>)</em>. Añade el parámetro <code>-Update</code> para añadir a un zip existente sin borrar el resto.`],
    [r`tree /f carpeta`, r`Contenido de una carpeta en árbol, con los archivos.`],
    [r`Get-ChildItem -File -Recurse -Filter "nombre*"`, r`Busca archivos dentro de una carpeta y sus subcarpetas.`],
    [r`Get-ChildItem -File -Recurse -Filter "virus*" | Remove-Item -WhatIf`, r`Busca y borra. Con <code>-WhatIf</code> solo enseña lo que borraría; quítalo para hacerlo de verdad.`],
    [r`Get-ChildItem carpeta -Recurse | Select-Object FullName`, r`Rutas completas de todo (alternativa a <code>tree /f</code>).`],
    [r`Select-String -Path install.log -Pattern "texto"`, r`Busca texto en un archivo y dice la línea. Es el <code>grep</code> de PowerShell; muy útil en logs.`],
    [r`Compress-Archive archivos -DestinationPath salida.zip`, r`Comprimir. El nombre del parámetro se puede omitir: <code>Compress-Archive archivos salida.zip</code>.`],
    [r`Expand-Archive salida.zip -DestinationPath destino -Force`, r`Descomprimir. <code>-Force</code> machaca si ya existe.`],
    [r`Install-Module 7Zip4PowerShell`, r`Instala un módulo del repositorio oficial. Con él, <code>Get-7Zip -ArchiveFileName archivo.zip</code> enseña lo que hay dentro sin descomprimir.`],
    [r`Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead("$pwd\apuntes.zip")
$zip.Entries | Select-Object Name, Length
$zip.Dispose()`, r`Ver lo que hay en un zip sin instalar nada (.NET). El <code>Dispose()</code> final es obligatorio: si no, el archivo queda bloqueado.`],
    [r`New-Item C:\Datos\Apuntes -ItemType Directory -Force`, r`Crea una carpeta y las intermedias (también <code>mkdir</code>). <code>-Force</code> no da error si ya existe.`],
    [r`Copy-Item Ejercicios Apuntes -Recurse`, r`Copiar (alias <code>cp</code>). <code>-Recurse</code> para carpetas completas y <code>-Force</code> para sobrescribir.`],
    [r`Move-Item tema1.txt Ejercicios`, r`Mover (alias <code>mv</code>).`],
    [r`Rename-Item viejo.txt nuevo.txt`, r`Cambiar de nombre.`],
    [r`Remove-Item carpeta -Recurse`, r`Borrar (alias <code>rm</code>). No pasa por la papelera.`],
    [r`Get-Content archivo.txt`, r`Ver el contenido (alias <code>cat</code>). <code>-Tail 10</code> son las últimas líneas y <code>-Wait</code> las sigue en directo. Por páginas: <code>| more</code>.`],
    [r`Set-Content archivo.txt "texto"`, r`Escribe, sustituyendo lo que hubiera. <code>Add-Content</code> añade al final.`],
    [r`Get-ChildItem C:\Windows -Include *.log -Recurse -File -ErrorAction SilentlyContinue`, r`Busca por extensión. <code>*</code> es cualquier cosa y <code>?</code> un carácter. El último parámetro calla los «acceso denegado».`],
    [r`Test-Path C:\Datos`, r`Dice si existe una ruta: <code>True</code> o <code>False</code>.`],
  ]},
  { asig: "ISO", seccion: "PowerShell básico", tema: "Alias y perfil", lista: [
    [r`Get-Alias -Definition cmd`, r`Te dice a qué alias equivale ese comando.`],
    [r`Get-Alias alias`, r`Te dice a qué comando va ligado ese alias.`],
    [r`New-Alias -Name "n" -Value cmd`, r`Crea un alias <strong>temporal</strong> (se borra al cerrar).`],
    [r`Remove-Item Alias:nombre`, r`Borra un alias temporalmente de la sesión.`],
  ]},
  { asig: "ISO", seccion: "PowerShell básico", tema: "Software", lista: [
    [r`curl.exe -L "https://link.com/app.msi" -o instalador.msi`, r`Descarga el archivo desde Internet. El parámetro <code>-L</code> sigue redirecciones y <code>-o</code> le asigna el nombre con el que se guardará en tu disco duro.`],
    [r`msiexec /i instalador.msi /quiet /norestart /log install.log`, r`Instala el paquete (<code>/i</code>), sin preguntar (<code>/quiet</code>), sin reiniciar automáticamente (<code>/norestart</code>) y escribiendo la instalación en un log (<code>/log</code>).`],
    [r`msiexec /x instalador.msi /quiet /norestart`, r`El parámetro <code>/x</code> se utiliza para desinstalar un programa .msi limpiamente.`],
    [r`& "C:\Program Files\Notepad++\notepad++.exe"`, r`<strong>Operador de invocación (&amp;):</strong> Lo siguiente que se ponga, el sistema entiende que lo posterior a "&amp;" es la ruta de un programa que debe ejecutar.`],
    [r`winget install Microsoft.PowerShell -e`, r`El parámetro <strong><code>-e</code> (exact)</strong> es crítico: obliga a Winget a buscar el paquete cuyo ID o nombre coincida <strong>exactamente</strong> con lo que has escrito.`],
    [r`choco source list`, r`Muestra los repositorios desde los que Chocolatey descargará el software.`],
    [r`choco search git`, r`Busca en el repositorio si existe un paquete con la palabra "git".`],
    [r`choco install git -y`, r`Descarga e instala Git silenciosamente (el <code>-y</code> acepta los términos automáticamente).`],
    [r`choco uninstall git -y`, r`Desinstala el programa limpiamente del sistema.`],
  ]},
  { asig: "ISO", seccion: "PowerShell básico", tema: "Usuarios y permisos", lista: [
    [r`Get-LocalUser`, r`Muestra todos los usuarios locales del equipo.`],
    [r`Get-LocalGroup`, r`Muestra todos los grupos locales configurados.`],
    [r`Get-Acl carpeta`, r`Lista de permisos de una carpeta.`],
    [r`Get-LocalUser | Get-Member`, r`Todas las propiedades que tiene un usuario.`],
    [r`Get-Acl E:\Apuntes | Format-List`, r`Permisos NTFS al detalle: propietario, quién y si es heredado.`],
    [r`Add-LocalGroupMember -Group "Usuarios de escritorio remoto" -Member heidi`, r`Permite a un usuario entrar por Escritorio Remoto. En Windows en inglés: <code>Remote Desktop Users</code>.`],
    [r`Get-LocalGroupMember "Administradores"`, r`Miembros de un grupo.`],
    [r`$acl = Get-Acl "E:\Apuntes"
$regla = New-Object System.Security.AccessControl.FileSystemAccessRule("pedro", "Modify", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl.AddAccessRule($regla)
Set-Acl "E:\Apuntes" $acl`, r`Da permiso de modificar sobre la carpeta y todo lo que contiene: leer la ACL, crear la regla, añadirla y guardar.`],
    [r`$acl = Get-Acl "E:\Apuntes"
$acl.SetAccessRuleProtection($true, $true)
Set-Acl "E:\Apuntes" $acl`, r`Rompe la herencia. El segundo <code>$true</code> conserva los permisos actuales como propios; con <code>$false</code> los pierde.`],
    [r`icacls E:\Apuntes /grant "pedro:(OI)(CI)M"`, r`Lo mismo en una línea: <code>M</code> modificar, <code>F</code> control total, <code>RX</code> leer y ejecutar. <code>(OI)(CI)</code> lo aplica a archivos y subcarpetas. <code>/inheritance:d</code> rompe la herencia.`],
  ]},
  { asig: "ISO", seccion: "PowerShell básico", tema: "Redes", lista: [
    [r`ipconfig /all`, r`Mostrar todas las configuraciones de red al detalle (IP, MAC, DNS, etc).`],
    [r`route print`, r`Mostrar las tablas de enrutamiento (ipv4 e ipv6) del equipo.`],
    [r`Get-NetAdapter`, r`Cmdlet de PowerShell para listar los adaptadores físicos o virtuales.`],
    [r`nslookup direccion`, r`Ver si los DNS funcionan correctamente / Pregunta al DNS por un dominio.`],
    [r`Get-NetFirewallRule -Name FPS-ICMP4-ERQ-In`, r`Ver si está activada la regla que <strong>permite</strong> los pings (mira el campo <code>Enabled</code>).`],
    [r`Enable-NetFirewallRule -Name FPS-ICMP4-ERQ-In`, r`Activa la regla interna del Firewall que permite responder al Ping entrante por IPv4 (Echo Request Inbound).`],
    [r`ping google.es`, r`Comprobar la conexión con una IP o un nombre. El firewall de Windows Server bloquea por defecto los pings que le llegan.`],
    [r`ipconfig /release`, r`Suelta la IP que le dio el DHCP.`],
    [r`ipconfig /renew`, r`Pide una IP nueva al DHCP.`],
  ]},
  { asig: "ISO", seccion: "PowerShell básico", tema: "SSH y copia remota", lista: [
    [r`ssh administrator@IP`, r`Inicia una terminal remota en el servidor destino por el puerto 22. Por defecto abre <strong>cmd</strong>; escribe <code>powershell</code> para pasar a PowerShell.`],
    [r`scp .\archivo.txt administrator@IP:C:/`, r`El comando <strong>Secure Copy (scp)</strong> funciona igual que en Linux. En este ejemplo, subimos el archivo local de tu PC a la raíz del disco C: del Servidor Windows.`],
    [r`Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0`, r`Instala el servidor SSH (en Windows Server 2025 ya viene).`],
    [r`Set-Service -Name sshd -StartupType Automatic
Start-Service sshd`, r`Arranca SSH y lo deja automático.`],
    [r`New-NetFirewallRule -Name "Allow_SSH" -DisplayName "Allow SSH" -Direction Inbound -Protocol TCP -LocalPort 22 -Action Allow`, r`Abre el puerto 22 en el firewall.`],
    [r`scp -r .\carpeta administrator@IP:C:/`, r`Copia una carpeta entera al servidor. Para traerla: <code>scp -r administrator@IP:C:/carpeta .</code>`],
  ]},
  { asig: "ISO", seccion: "PowerShell avanzado", tema: "Usuarios y grupos", lista: [
    [r`$clave = Read-Host "Contraseña" -AsSecureString
New-LocalUser -Name heidi -Password $clave -AccountNeverExpires`, r`Crea un usuario local pidiendo la contraseña sin que se vea. Debe cumplir la complejidad y no contener el nombre de usuario.`],
    [r`Add-LocalGroupMember -Group "Usuarios" -Member heidi`, r`Añade un usuario a un grupo. Los nombres de grupo dependen del idioma de Windows.`],
    [r`if (Get-LocalUser -Name $usuario -ErrorAction SilentlyContinue) { "Ya existe" }`, r`Comprueba si un usuario existe sin que salte un error.`],
    [r`foreach ($i in Import-Csv "$PSScriptRoot\usuarios.csv") {
  $clave = ConvertTo-SecureString $i.contra -AsPlainText -Force
  New-LocalUser -Name $i.nombre -Password $clave -AccountNeverExpires -PasswordNeverExpires
  Add-LocalGroupMember -Group "Usuarios" -Member $i.nombre
}`, r`Creación masiva desde un CSV con columnas <code>nombre</code> y <code>contra</code>. <code>$PSScriptRoot</code> es la carpeta del script, así que el CSV va al lado.`],
    [r`Remove-LocalUser -Name heidi`, r`Elimina un usuario local. En bucle sobre el mismo CSV, sirve para borrarlos todos.`],
    [r`try { New-LocalUser -Name $u -Password $c -ErrorAction Stop }
catch { Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red }`, r`Control de errores: <code>-ErrorAction Stop</code> hace que el error llegue al <code>catch</code>.`],
  ]},
  { asig: "ISO", seccion: "PowerShell avanzado", tema: "Carpetas compartidas", lista: [
    [r`New-SmbShare -Name Recurso -Path C:\Carpeta -FullAccess "Administradores"`, r`Comparte una carpeta, que tiene que existir. <code>-Description</code> le pone descripción.`],
    [r`Get-SmbShare`, r`Ver los recursos compartidos.`],
    [r`Set-SmbShare -Name Recurso -Description "Nueva" -Force`, r`Modifica el recurso.`],
    [r`Get-SmbShareAccess -Name Recurso`, r`Permisos del recurso.`],
    [r`Grant-SmbShareAccess -Name Recurso -AccountName "Usuarios" -AccessRight Read -Force`, r`Da permiso (<code>Read</code>, <code>Change</code> o <code>Full</code>). <code>Revoke-SmbShareAccess</code> lo quita.`],
    [r`Block-SmbShareAccess -Name Recurso -AccountName "Invitado" -Force`, r`Deniega el acceso. <code>Unblock-SmbShareAccess</code> retira la denegación.`],
    [r`Remove-SmbShare -Name Recurso -Force`, r`Deja de compartir la carpeta (no la borra).`],
  ]},
  { asig: "ISO", seccion: "PowerShell avanzado", tema: "Discos", lista: [
    [r`New-VHD -Path C:\VHD\disco1.vhdx -SizeBytes 10GB -Dynamic`, r`Crea un disco virtual. Necesita Hyper-V, que no funciona dentro de una MV de VirtualBox.`],
    [r`Mount-VHD -Path C:\VHD\disco1.vhdx -Passthru | Initialize-Disk -PassThru | New-Partition -AssignDriveLetter -UseMaximumSize | Format-Volume -FileSystem NTFS -Confirm:$false`, r`Lo monta, inicializa, particiona y formatea en una sola línea.`],
    [r`Get-VHD -Path C:\VHD\disco1.vhdx`, r`Datos del disco virtual.`],
    [r`Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All`, r`Instala Hyper-V en Windows 10 y 11 Pro (pide reiniciar). En Windows Server: <code>Install-WindowsFeature Hyper-V -IncludeManagementTools -Restart</code>.`],
  ]},
  { asig: "ISO", seccion: "PowerShell avanzado", tema: "Red", lista: [
    [r`Get-NetIPConfiguration`, r`Configuración IP actual. Apúntala antes de cambiar nada.`],
    [r`New-NetIPAddress -InterfaceIndex 5 -IPAddress 192.168.1.10 -PrefixLength 24 -DefaultGateway 192.168.1.1`, r`Pone una IP fija. El índice sale con <code>Get-NetAdapter</code>. Hazlo desde la consola: por RDP o SSH puedes perder la conexión.`],
    [r`Set-DnsClientServerAddress -InterfaceIndex 5 -ServerAddresses 8.8.8.8, 8.8.4.4`, r`Pone los DNS. Con <code>-ResetServerAddresses</code> vuelven a automático.`],
    [r`Remove-NetIPAddress -InterfaceIndex 5 -Confirm:$false
Remove-NetRoute -InterfaceIndex 5 -Confirm:$false`, r`Borra la IP y las rutas anteriores antes de poner otras.`],
    [r`Set-NetIPInterface -InterfaceIndex 5 -Dhcp Enabled
Restart-NetAdapter -Name "Ethernet"`, r`Vuelve a DHCP y reinicia el adaptador.`],
    [r`Test-Connection -ComputerName 192.168.1.1 -Count 1 -Quiet`, r`Ping que devuelve solo <code>True</code> o <code>False</code>: ideal para scripts.`],
  ]},
  { asig: "ISO", seccion: "PowerShell avanzado", tema: "Procesos y servicios", lista: [
    [r`Start-Process notepad`, r`Inicia un programa.`],
    [r`Get-Process -Name notepad | Format-Table Id, ProcessName, CPU, @{N="Memoria(MB)"; E={[math]::Round($_.WS/1MB,2)}}`, r`Datos de un proceso, con la memoria en MB.`],
    [r`Stop-Process -Name notepad -Force`, r`Cierra un proceso a la fuerza.`],
    [r`Get-Service -Name Spooler`, r`Estado de un servicio. <code>-RequiredServices</code>: los que necesita. <code>-DependentServices</code>: los que dependen de él.`],
    [r`Start-Service -Name Spooler`, r`Inicia el servicio. <code>Stop-Service -Force</code> lo para y <code>Restart-Service</code> lo reinicia.`],
    [r`Set-Service -Name Spooler -StartupType Manual`, r`Tipo de inicio: <code>Automatic</code>, <code>Manual</code> o <code>Disabled</code>. Como administrador.`],
  ]},
  { asig: "ISO", seccion: "PowerShell avanzado", tema: "Tareas programadas", lista: [
    [r`$accion = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -File C:\scripts\apagar.ps1"
$cuando = New-ScheduledTaskTrigger -Daily -At 16:00
Register-ScheduledTask -TaskName "ApagadoDiario" -Action $accion -Trigger $cuando -User "SYSTEM"`, r`Programa una tarea en tres pasos: qué hace, cuándo y registrarla.`],
    [r`Get-ScheduledTask -TaskName "ApagadoDiario"`, r`Ver la tarea y su estado.`],
    [r`Set-ScheduledTask -TaskName "ApagadoDiario" -Trigger (New-ScheduledTaskTrigger -Daily -At 17:00)`, r`Cambia la hora.`],
    [r`Disable-ScheduledTask -TaskName "ApagadoDiario"`, r`La desactiva. <code>Enable-ScheduledTask</code> la reactiva.`],
    [r`Unregister-ScheduledTask -TaskName "ApagadoDiario" -Confirm:$false`, r`Elimina la tarea.`],
  ]},
  { asig: "ISO", seccion: "PowerShell avanzado", tema: "Impresoras", lista: [
    [r`pnputil /add-driver C:\Drivers\driver.inf /install`, r`Mete el controlador en el almacén de Windows. Imprescindible antes de instalarlo.`],
    [r`Add-PrinterDriver -Name "Nombre del controlador"
Add-PrinterPort -Name Puerto1 -PrinterHostAddress 192.168.1.50
Add-Printer -Name Impresora1 -DriverName "Nombre del controlador" -PortName Puerto1`, r`Instala una impresora de red: controlador, puerto e impresora, en ese orden.`],
    [r`Get-Printer`, r`Impresoras instaladas. <code>Get-PrinterDriver</code> muestra los controladores.`],
    [r`Remove-Printer -Name Impresora1
Remove-PrinterPort -Name Puerto1
Remove-PrinterDriver -Name "Nombre del controlador"`, r`Desinstalar, en este orden: el controlador solo se borra si ninguna impresora lo usa.`],
  ]},
  { asig: "ISO", seccion: "PowerShell avanzado", tema: "Eventos", lista: [
    [r`Get-WinEvent -LogName System -MaxEvents 5`, r`Últimos eventos del sistema. Es el método recomendado.`],
    [r`Get-WinEvent -FilterHashtable @{ LogName='System'; Level=2,3; StartTime=(Get-Date).AddDays(-2) }`, r`Filtra eventos. Niveles: 1 crítico, 2 error, 3 aviso, 4 información.`],
    [r`Get-EventLog -LogName System -EntryType Error -Newest 5`, r`Método antiguo: funciona en PowerShell 5.1, pero no en la 7.`],
  ]},
  { asig: "ISO", seccion: "PowerShell avanzado", tema: "Información del equipo (CIM)", lista: [
    [r`Get-CimInstance -ClassName Win32_OperatingSystem`, r`Datos del equipo. Cambia la clase: <code>Win32_Bios</code>, <code>Win32_Processor</code>, <code>Win32_DiskDrive</code>, <code>Win32_Baseboard</code>, <code>Win32_PhysicalMemory</code>, <code>Win32_ComputerSystem</code>, <code>Win32_Share</code>.`],
    [r`Get-CimInstance Win32_NetworkAdapter | Where-Object { $_.PhysicalAdapter } | Format-Table Name, MACAddress, NetEnabled`, r`Adaptadores de red físicos. <code>Where-Object</code> filtra los objetos.`],
    [r`Get-CimInstance Win32_PhysicalMemory | Format-Table Manufacturer, @{N="Capacidad(GB)"; E={$_.Capacity/1GB}}, Speed`, r`Módulos de memoria, con la capacidad en GB. <code>Get-WmiObject</code> es el método antiguo.`],
  ]},
  { asig: "ISO", seccion: "Dominios Windows y Linux", tema: "Active Directory", lista: [
    [r`Install-WindowsFeature AD-Domain-Services -IncludeManagementTools`, r`Instala el rol de Active Directory. El servidor necesita IP fija y usarse a sí mismo como DNS.`],
    [r`Install-ADDSForest -DomainName ejemplo.org`, r`Crea el dominio en un bosque nuevo y convierte el servidor en controlador de dominio. Reinicia.`],
    [r`Add-Computer -DomainName ejemplo.org -Restart`, r`Une un equipo al dominio. Antes, pon como DNS del cliente la IP del controlador de dominio.`],
    [r`Get-ADUser -Filter * | Select-Object Name, SamAccountName, DistinguishedName`, r`Usuarios del dominio. <code>DistinguishedName</code> dice en qué OU está cada uno.`],
    [r`New-ADOrganizationalUnit -Name Ventas -Path "DC=ejemplo,DC=org"`, r`Crea una unidad organizativa (OU).`],
    [r`New-ADGroup -Name GRP_Ventas -GroupScope Global -Path "OU=Ventas,DC=ejemplo,DC=org"`, r`Crea un grupo global. Los permisos se dan a los grupos, no a los usuarios.`],
    [r`Add-ADGroupMember -Identity GRP_Ventas -Members ventas01, ventas02`, r`Mete usuarios en un grupo.`],
  ]},
  { asig: "ISO", seccion: "Dominios Windows y Linux", tema: "Directivas de grupo (GPO)", lista: [
    [r`gpupdate /force`, r`En el cliente, aplica las GPO sin esperar.`],
    [r`gpresult /r /scope computer`, r`Qué GPO se están aplicando al equipo. Con <code>/scope user</code>, al usuario. Ejecutar como administrador.`],
    [r`gpresult /h informe.html`, r`El mismo informe en una página HTML.`],
    [r`Get-WinEvent -LogName System -MaxEvents 20 | Where-Object ProviderName -match "GroupPolicy|Application Management"`, r`Errores de GPO en el cliente (también en el Visor de eventos, Registros de Windows, Sistema).`],
  ]},
  { asig: "ISO", seccion: "Dominios Windows y Linux", tema: "Recursos compartidos", lista: [
    [r`Get-SmbShare | Where-Object { $_.Name -notlike "*$" }`, r`Recursos compartidos, sin los ocultos del sistema (los que acaban en <code>$</code>).`],
    [r`Get-SmbShareAccess -Name Ventas`, r`Permisos de un recurso compartido.`],
    [r`\\servidor\recurso`, r`Ruta para entrar desde el cliente con <code>Windows+R</code>.`],
  ]},

  // ───────────────────────── GBD ─────────────────────────
  { asig: "GBD", seccion: "Diseño físico (DDL)", tema: "Tablas", lista: [
    [r`CREATE TABLE EMPRESAS (
  ID_EMPRESA NUMBER(10),
  NOMBRE_EMPRESA VARCHAR2(100) NOT NULL,
  CONSTRAINT pk_empresas PRIMARY KEY (ID_EMPRESA)
);`, r`Crea una tabla con su clave primaria. Los tipos <code>NUMBER</code> y <code>VARCHAR2</code> son de Oracle; en MySQL serían <code>INT</code> y <code>VARCHAR</code>.`],
    [r`CREATE TABLE empleados (
  id_emp     NUMBER(6),
  nombre     VARCHAR2(25) NOT NULL,
  email      VARCHAR2(50),
  edad       NUMBER(3),
  fecha_alta DATE DEFAULT SYSDATE,
  cod_prov   NUMBER(2),
  CONSTRAINT pk_emp PRIMARY KEY (id_emp),
  CONSTRAINT uq_emp_email UNIQUE (email),
  CONSTRAINT ck_emp_edad CHECK (edad BETWEEN 18 AND 65),
  CONSTRAINT fk_emp_prov FOREIGN KEY (cod_prov)
    REFERENCES provincias (cod_prov) ON DELETE CASCADE
);`, r`Tabla con todas las restricciones: clave primaria, única, comprobación, clave ajena, obligatoria y valor por defecto. Ponles nombre para poder quitarlas luego. <code>ON DELETE CASCADE</code> borra las filas hijas al borrar la padre.`],
    [r`DESC empleados`, r`Columnas y tipos de una tabla.`],
    [r`SELECT table_name FROM user_tables;`, r`Tus tablas. <code>ALL_TABLES</code>: las que puedes ver. <code>DBA_TABLES</code>: todas (administrador).`],
    [r`SELECT constraint_name, constraint_type
FROM user_constraints
WHERE table_name = 'EMPLEADOS';`, r`Restricciones de una tabla: <code>P</code> primaria, <code>R</code> ajena, <code>U</code> única, <code>C</code> check. El nombre de la tabla va en mayúsculas. Las columnas afectadas están en <code>USER_CONS_COLUMNS</code>.`],
    [r`DROP TABLE empleados CASCADE CONSTRAINTS;`, r`Borra la tabla. <code>CASCADE CONSTRAINTS</code> quita también las claves ajenas que apuntan a ella.`],
    [r`TRUNCATE TABLE empleados;`, r`Vacía la tabla pero la conserva. Es DDL: no se puede deshacer con ROLLBACK. No funciona si otra tabla la referencia con una clave ajena activa.`],
    [r`CREATE PUBLIC SYNONYM empleados FOR scott.emp;`, r`Sinónimo, para no escribir <code>esquema.objeto</code>. Con <code>PUBLIC</code> lo pueden usar todos (si tienen permiso sobre el objeto).`],
  ]},
  { asig: "GBD", seccion: "Diseño físico (DDL)", tema: "Modificar tablas", lista: [
    [r`ALTER TABLE empleados ADD (telefono VARCHAR2(9));`, r`Añade una columna. Si tiene que ser NOT NULL y ya hay filas: añádela sin la restricción, rellénala y luego ponla.`],
    [r`ALTER TABLE empleados MODIFY (nombre VARCHAR2(40));`, r`Cambia tipo o tamaño. Para reducir, no puede haber valores más largos.`],
    [r`ALTER TABLE empleados DROP COLUMN telefono;`, r`Borra una columna. No se puede con una clave primaria referenciada por otra tabla.`],
    [r`ALTER TABLE empleados ADD CONSTRAINT ck_edad CHECK (edad >= 18);`, r`Añade una restricción (<code>PRIMARY KEY</code>, <code>FOREIGN KEY</code>, <code>UNIQUE</code>, <code>CHECK</code>).`],
    [r`ALTER TABLE empleados DROP CONSTRAINT ck_edad;`, r`Quita una restricción por su nombre.`],
    [r`ALTER TABLE empleados DISABLE CONSTRAINT fk_emp_prov;`, r`La desactiva temporalmente, por ejemplo para una carga grande. <code>ENABLE CONSTRAINT</code> la reactiva.`],
  ]},
  { asig: "GBD", seccion: "Diseño físico (DDL)", tema: "Restricciones", lista: [
    [r`CREATE TABLE telefonos (
  numero     VARCHAR2(9) PRIMARY KEY,
  id_persona NUMBER(6) REFERENCES personas (id) ON DELETE SET NULL
);`, r`Clave ajena en la propia columna, sin <code>FOREIGN KEY</code>. Si se borra la persona, queda a <code>NULL</code>.`],
    [r`CONSTRAINT pk_matricula PRIMARY KEY (id_alumno, id_asignatura)`, r`Clave primaria de varias columnas: siempre al final de la tabla.`],
    [r`CONSTRAINT uq_persona UNIQUE (dni, nombre)`, r`Única entre varias columnas: no se puede repetir la pareja.`],
    [r`CREATE TABLE telefonos (
  numero     VARCHAR(9) PRIMARY KEY,
  id_persona INT,
  FOREIGN KEY (id_persona) REFERENCES personas (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;`, r`En MySQL. Las claves ajenas solo funcionan con <code>InnoDB</code>, y hay que escribirlas aparte. <code>ON UPDATE</code> no existe en Oracle.`],
  ]},
  { asig: "GBD", seccion: "Consultas", tema: "SELECT básico", lista: [
    [r`SELECT [ALL | DISTINCT] col1, col2
FROM tabla1, tabla2
WHERE condicion
ORDER BY col1 [DESC | ASC];`, r`Estructura básica de una consulta. Lo que va entre corchetes es opcional: elige una opción o quítalo.`],
    [r`SELECT DISTINCT deptno FROM emp;`, r`Sin filas repetidas.`],
    [r`SELECT * FROM emp WHERE sal > 1000 AND comm IS NOT NULL;`, r`Condiciones con <code>AND</code>, <code>OR</code>, <code>NOT</code> y paréntesis. Los nulos se comparan con <code>IS NULL</code>, nunca con <code>=</code>.`],
    [r`SELECT * FROM emp WHERE sal BETWEEN 1000 AND 2000;`, r`Rango, con los extremos incluidos. Se puede negar: <code>NOT BETWEEN</code>.`],
    [r`SELECT * FROM emp WHERE job IN ('CLERK', 'MANAGER');`, r`Pertenece a una lista. Se puede negar: <code>NOT IN</code>.`],
    [r`SELECT * FROM emp WHERE ename LIKE 'P%';`, r`Patrón de texto: <code>%</code> cualquier cosa, <code>_</code> un carácter. Dentro de las comillas se distinguen mayúsculas; para ignorarlas, <code>UPPER(ename) LIKE 'P%'</code>.`],
    [r`SELECT ename, sal * 12 AS salario_anual
FROM emp
ORDER BY job ASC, sal * 12 DESC;`, r`Columna calculada con alias y orden por dos criterios: manda el primero y el segundo desempata.`],
  ]},
  { asig: "GBD", seccion: "Consultas", tema: "Varias tablas (JOIN)", lista: [
    [r`SELECT e.ename, d.dname
FROM emp e, dept d
WHERE e.deptno = d.deptno;`, r`Combina dos tablas. Sin la condición de join sale el producto cartesiano (todas con todas). Hacen falta tantas condiciones como tablas menos una.`],
    [r`SELECT e.ename, d.dname
FROM emp e JOIN dept d ON e.deptno = d.deptno;`, r`Lo mismo con la sintaxis estándar.`],
    [r`SELECT d.dname, COUNT(e.empno)
FROM dept d LEFT JOIN emp e ON e.deptno = d.deptno
GROUP BY d.dname;`, r`Combinación externa: salen todos los departamentos, aunque no tengan empleados. Usa <code>COUNT(e.empno)</code> y no <code>COUNT(*)</code>, que contaría 1 en los vacíos.`],
    [r`SELECT d.dname, COUNT(e.empno)
FROM emp e, dept d
WHERE e.deptno(+) = d.deptno
GROUP BY d.dname;`, r`La misma combinación externa al estilo Oracle: el <code>(+)</code> va en la tabla a la que le pueden faltar filas.`],
    [r`SELECT e.ename, e.sal, s.grade
FROM emp e JOIN salgrade s ON e.sal BETWEEN s.losal AND s.hisal;`, r`Combinación sin igualdad (<em>non-equijoin</em>): en qué tramo cae cada sueldo.`],
    [r`SELECT e.ename AS empleado, j.ename AS jefe
FROM emp e LEFT JOIN emp j ON e.mgr = j.empno;`, r`Una tabla consigo misma (<em>self join</em>), con dos alias. El <code>LEFT</code> conserva a quien no tiene jefe.`],
    [r`SELECT c.name, o.ordid, i.itemid
FROM customer c
JOIN ord o ON o.custid = c.custid
JOIN item i ON i.ordid = o.ordid;`, r`Tres tablas: cada <code>JOIN</code> añade una. Para n tablas hacen falta n − 1 condiciones.`],
    [r`SELECT e.ename, d.dname FROM emp e CROSS JOIN dept d;`, r`Producto cartesiano: todas con todas (14 × 4 = 56). Con la sintaxis de comas sale sin querer si olvidas la condición.`],
  ]},
  { asig: "GBD", seccion: "Consultas", tema: "Agrupar", lista: [
    [r`SELECT deptno, COUNT(*), AVG(sal)
FROM emp
GROUP BY deptno;`, r`Subtotales por grupo. Todo lo que no sea función de grupo en el SELECT tiene que estar en el GROUP BY.`],
    [r`SELECT deptno, COUNT(*)
FROM emp
WHERE job = 'CLERK'
GROUP BY deptno
HAVING COUNT(*) > 4
ORDER BY deptno;`, r`<code>WHERE</code> filtra filas y <code>HAVING</code> filtra grupos. Se evalúan en este orden: WHERE, GROUP BY, HAVING, ORDER BY.`],
    [r`SELECT deptno, AVG(sal)
FROM emp
GROUP BY deptno
HAVING AVG(sal) > (SELECT AVG(sal) FROM emp);`, r`Departamentos cuyo salario medio supera el de toda la empresa.`],
    [r`SELECT deptno, COUNT(*)
FROM emp
GROUP BY deptno
HAVING COUNT(*) = (SELECT MAX(COUNT(*)) FROM emp GROUP BY deptno);`, r`El departamento con más empleados. <strong>Oracle:</strong> en MySQL no se puede anidar <code>MAX(COUNT(*))</code>.`],
  ]},
  { asig: "GBD", seccion: "Consultas", tema: "Subconsultas", lista: [
    [r`SELECT ename FROM emp
WHERE job = (SELECT job FROM emp WHERE empno = 7082);`, r`Compara con un solo valor. Si la subconsulta devuelve más de una fila, da error.`],
    [r`SELECT ename FROM emp
WHERE job IN (SELECT job FROM emp WHERE deptno = 20);`, r`Compara con varios valores.`],
    [r`SELECT dname FROM dept d
WHERE EXISTS (SELECT 1 FROM emp e WHERE e.deptno = d.deptno);`, r`Departamentos que tienen algún empleado. <code>NOT EXISTS</code>: los que no tienen ninguno.`],
    [r`SELECT * FROM emp
WHERE sal < ALL (SELECT sal FROM emp WHERE deptno = 30);`, r`<code>ALL</code>: se cumple con todos los valores. <code>ANY</code>: con al menos uno.`],
    [r`SELECT ename FROM emp
WHERE (job, sal) = (SELECT job, sal FROM emp WHERE ename = 'JAMES');`, r`Compara dos columnas a la vez.`],
    [r`SELECT * FROM emp e
WHERE sal = (SELECT MAX(sal) FROM emp WHERE deptno = e.deptno);`, r`Subconsulta correlacionada: usa el alias de la consulta de fuera. Da quien más cobra en cada departamento.`],
  ]},
  { asig: "GBD", seccion: "Consultas", tema: "Conjuntos", lista: [
    [r`SELECT nombre FROM alum
UNION
SELECT nombre FROM nuevos;`, r`Une resultados sin repetidos; con <code>UNION ALL</code>, con repetidos. Mismo número de columnas y tipos compatibles.`],
    [r`SELECT nombre FROM alum
INTERSECT
SELECT nombre FROM antiguos;`, r`Las filas que están en las dos.`],
    [r`SELECT nombre FROM alum
MINUS
SELECT nombre FROM antiguos;`, r`Las que están en la primera y no en la segunda. En MySQL 8 es <code>EXCEPT</code>.`],
  ]},
  { asig: "GBD", seccion: "Consultas", tema: "Funciones (Oracle)", lista: [
    [r`SELECT COUNT(*), COUNT(comm), AVG(sal), MAX(sal), MIN(sal), SUM(sal) FROM emp;`, r`Funciones de grupo. <code>COUNT(*)</code> cuenta filas; <code>COUNT(comm)</code>, solo las que no son nulas.`],
    [r`SELECT sal + NVL(comm, 0) FROM emp;`, r`Cambia un nulo por otro valor. En MySQL es <code>IFNULL</code>.`],
    [r`SELECT ROUND(1.2676, 2), TRUNC(1.2676, 2), CEIL(20.3), FLOOR(20.3), MOD(11, 4) FROM dual;`, r`Redondear, cortar decimales, entero superior, entero inferior y resto. <code>dual</code> es una tabla de prueba.`],
    [r`SELECT UPPER(ename), LOWER(ename), INITCAP(ename), LENGTH(ename) FROM emp;`, r`Mayúsculas, minúsculas, tipo título y longitud.`],
    [r`SELECT SUBSTR(ename, 1, 3), INSTR(ename, 'A'), REPLACE(ename, 'A', 'E') FROM emp;`, r`Trozo de texto, posición de un carácter y sustituir.`],
    [r`SELECT LPAD(ename, 20, '.'), RPAD(ename, 20, '.'), LTRIM('  hola') FROM emp;`, r`Rellenar por la izquierda o la derecha y quitar espacios.`],
    [r`SELECT SYSDATE, ADD_MONTHS(SYSDATE, 12), LAST_DAY(SYSDATE) FROM dual;`, r`Fecha de hoy, sumar meses y último día del mes.`],
    [r`SELECT MONTHS_BETWEEN(SYSDATE, hiredate), NEXT_DAY(SYSDATE, 'JUEVES') FROM emp;`, r`Meses entre dos fechas y próximo día de la semana (el nombre va en el idioma de la sesión).`],
    [r`SELECT TO_CHAR(hiredate, 'DD/MM/YYYY'), TO_CHAR(sal, '99G999D99') FROM emp;`, r`Fecha o número a texto con formato. <code>G</code> es el separador de miles y <code>D</code> el decimal.`],
    [r`SELECT TO_DATE('01/01/2026', 'DD/MM/YYYY') FROM dual;`, r`Texto a fecha. <code>TO_NUMBER</code> hace lo mismo con números.`],
  ]},
  { asig: "GBD", seccion: "Modificación (DML)", tema: "INSERT", lista: [
    [r`INSERT INTO profesores (id, nombre, especialidad)
VALUES (22, 'Miguel A.', 'HISTORIA');`, r`Inserción estándar especificando columnas. Si se omite alguna columna en la declaración, el SGBD le asignará el valor <code>NULL</code> (o el valor <code>DEFAULT</code> si lo tuviera). Si la columna omitida es <code>NOT NULL</code>, la consulta fallará.`],
    [r`INSERT INTO profesores VALUES (23, 'Isabel', 'INFORMATICA', 45);`, r`Inserción omitiendo nombres de columnas. Es obligatorio proporcionar un valor para <strong>todas</strong> las columnas de la tabla y en el orden exacto en el que fueron creadas en el DDL.`],
    [r`INSERT INTO profesores_historico (nombre, especialidad)
SELECT nombre, especialidad FROM profesores WHERE id = 20;`, r`Inserta lo que devuelve una consulta. <strong>Importante:</strong> No se utiliza la palabra reservada <code>VALUES</code> cuando se usa un <code>SELECT</code> como origen de los datos.`],
    [r`INSERT INTO emple30
SELECT * FROM empleados WHERE dept_no = 40;`, r`Insertar todos los empleados del departamento 40 en una tabla de backup (emple30).`],
    [r`INSERT INTO empleados VALUES (1003, 'LOPEZ', 'EMPLEADO', NULL, NULL, NULL, NULL,
  (SELECT dept_no FROM empleados GROUP BY dept_no HAVING COUNT(*) = 3)
);`, r`Insertar un empleado asignándole dinámicamente un departamento mediante subconsulta (el que actualmente tiene 3 empleados). <strong>Oracle:</strong> en MySQL da error 1093 porque la subconsulta lee la misma tabla que se modifica.`],
    [r`INSERT INTO emp (empno, ename, hiredate, sal, deptno)
SELECT 1111, 'GARCIA', SYSDATE, sal, deptno
FROM emp WHERE ename = 'PEPE';`, r`Mezcla valores fijos con otros sacados de la tabla: mismo sueldo y departamento que PEPE.`],
  ]},
  { asig: "GBD", seccion: "Modificación (DML)", tema: "UPDATE", lista: [
    [r`UPDATE emp
SET sal = sal * 1.10, comm = 100
WHERE deptno = 20;`, r`Actualizar varias columnas a la vez. Sube el salario un 10% y fija la comisión a 100 <strong>solo</strong> a los empleados del departamento 20.`],
    [r`UPDATE emp
SET sal = (SELECT MAX(sal) FROM emp)
WHERE ename = 'PEPE';`, r`Subconsulta en el SET. Asigna a 'PEPE' el salario más alto que exista en toda la empresa. <strong>Oracle:</strong> en MySQL da error 1093; hay que envolver la subconsulta: <code>(SELECT m FROM (SELECT MAX(sal) AS m FROM emp) t)</code>.`],
    [r`UPDATE emp SET comm = 500
WHERE deptno IN (SELECT deptno FROM dept WHERE loc = 'MADRID');`, r`Subconsulta en el WHERE. Pone una comisión de 500 a todos los empleados cuyos departamentos estén ubicados físicamente en Madrid.`],
    [r`UPDATE empleados
SET salario = (SELECT salario FROM empleados WHERE apellido = 'ARROYO'),
    oficio = (SELECT oficio FROM empleados WHERE apellido = 'ARROYO')
WHERE apellido = 'FERNÁNDEZ';`, r`Doble actualización SET con doble subconsulta: igualar el salario y oficio de FERNÁNDEZ al salario y oficio de ARROYO. <strong>Oracle:</strong> en MySQL da error 1093 porque lee la misma tabla que modifica.`],
    [r`UPDATE empleados
SET salario = salario / 2, comision = 0
WHERE dept_no = (SELECT dept_no FROM departamentos WHERE dnombre = 'PRODUCCIÓN');`, r`Cambiar salario a la mitad y comision a 0 si cumplen una condición externa.`],
    [r`UPDATE emp
SET sal = sal + 100, comm = NVL(comm, 0) + 10
WHERE empno = 7369;`, r`Sumar a una columna que puede ser nula: sin <code>NVL</code>, <code>NULL + 10</code> da <code>NULL</code>.`],
    [r`UPDATE emp
SET ename = LOWER(ename),
    sal = (SELECT sal * 2 FROM emp WHERE ename = 'JAMES')
WHERE deptno = (SELECT deptno FROM dept WHERE dname = 'ACCOUNTING');`, r`Subconsulta en el valor y en la condición a la vez. La del <code>SET</code> tiene que devolver una sola fila.`],
  ]},
  { asig: "GBD", seccion: "Modificación (DML)", tema: "DELETE", lista: [
    [r`DELETE FROM emp WHERE deptno = 20;`, r`Elimina únicamente a los empleados que pertenecen al departamento 20.`],
    [r`DELETE FROM emp
WHERE deptno IN (SELECT deptno FROM dept WHERE loc = 'CHICAGO');`, r`Elimina a todos los empleados cuya localización de departamento sea Chicago.`],
    [r`DELETE FROM departamentos
WHERE NOT EXISTS (SELECT 1 FROM empleados WHERE empleados.dept_no = departamentos.dept_no);`, r`Borrar TODOS los departamentos que no tengan empleados (Borrado de "Huérfanos"). Con <code>NOT IN (SELECT dept_no FROM empleados)</code> basta un solo empleado con <code>dept_no</code> a NULL para que no borre nada.`],
  ]},
  { asig: "GBD", seccion: "Modificación (DML)", tema: "Transacciones", lista: [
    [r`START TRANSACTION; -- En MySQL explícito (o BEGIN)

-- 1. Quitar dinero a la cuenta origen
UPDATE cuentas SET saldo = saldo - 500 WHERE num_cuenta = 11111;

-- 2. Añadir dinero a la cuenta destino
UPDATE cuentas SET saldo = saldo + 500 WHERE num_cuenta = 22222;

COMMIT;`, r`El clásico ejemplo de la transferencia bancaria. Si el sistema <strong>se cae</strong> antes del COMMIT, todo se deshace solo. Pero si una orden <strong>da error</strong>, solo se deshace esa orden: tienes que lanzar tú <code>ROLLBACK;</code>, porque un <code>COMMIT</code> guardaría el primer UPDATE y se perdería el dinero. (En MySQL se requiere motor <strong>InnoDB</strong> para que funcione; en Oracle no existe START TRANSACTION, la transacción empieza sola).`],
    [r`COMMIT;`, r`Guarda todo lo hecho desde el último <code>COMMIT</code>.`],
    [r`ROLLBACK;`, r`Deshace hasta el último <code>COMMIT</code>. También ocurre solo si falla el sistema.`],
    [r`SAVEPOINT antes;
DELETE FROM emp WHERE deptno = 20;
ROLLBACK TO antes;`, r`Punto intermedio: deshace solo lo posterior.`],
    [r`SHOW AUTOCOMMIT`, r`En SQL*Plus, dice si cada orden se guarda sola (por defecto, no). Se cambia con <code>SET AUTOCOMMIT ON</code>. En MySQL viene activado.`],
  ]},
  { asig: "GBD", seccion: "Seguridad de datos", tema: "Usuarios y privilegios", lista: [
    [r`CREATE USER heidi IDENTIFIED BY contraseña DEFAULT TABLESPACE users;`, r`Crea un usuario en Oracle. Recién creado no puede ni conectarse.`],
    [r`GRANT CONNECT, RESOURCE TO heidi;`, r`Le da roles: conectarse y crear objetos propios.`],
    [r`GRANT SELECT, INSERT ON empleados TO heidi;`, r`Da permisos sobre una tabla concreta.`],
    [r`REVOKE INSERT ON empleados FROM heidi;`, r`Quita un permiso.`],
    [r`CONNECT heidi`, r`Cambiar de usuario en SQL*Plus. Para consultar una tabla de otro: <code>usuario.tabla</code>.`],
  ]},
  { asig: "GBD", seccion: "Seguridad de datos", tema: "Vistas", lista: [
    [r`CREATE OR REPLACE VIEW vista_ventas AS
SELECT id_emp, nombre FROM empleados WHERE departamento = 'Ventas';`, r`Consulta con nombre que se usa como una tabla. Sirve para enseñar solo ciertas columnas o filas.`],
    [r`SELECT * FROM vista_ventas;`, r`Se consulta como una tabla.`],
    [r`UPDATE vista_ventas SET nombre = 'ANA' WHERE id_emp = 1;`, r`Se puede modificar si la vista no usa funciones de grupo, <code>DISTINCT</code>, <code>GROUP BY</code> ni varias tablas.`],
    [r`DROP VIEW vista_ventas;`, r`Borra la vista, no los datos.`],
  ]},
  { asig: "PAR", seccion: "Cisco básico", tema: "Modos y guardar", lista: [
    [r`enable`, r`Pasa del modo usuario (<code>router></code>) al privilegiado (<code>router#</code>).`],
    [r`configure terminal`, r`Entra en configuración. Se abrevia <code>conf t</code>. Con <code>exit</code> subes un nivel y con <code>Ctrl+Z</code> sales del todo.`],
    [r`write`, r`Guarda la configuración actual (<code>running-config</code>) en la de arranque (<code>startup-config</code>). Se abrevia <code>wr</code>. Si apagas sin guardar, se pierde.`],
    [r`show running-config`, r`Configuración actual.`],
    [r`no ip domain-lookup`, r`Evita que se quede pillado buscando en DNS cada vez que escribes mal un comando.`],
    [r`copy running-config startup-config`, r`Forma larga de guardar.`],
    [r`erase startup-config
reload`, r`Borra la configuración guardada y reinicia: equipo de fábrica. En un switch, además, <code>delete vlan.dat</code>.`],
    [r`show startup-config`, r`Configuración guardada (NVRAM).`],
    [r`show version`, r`Modelo, versión del IOS, memoria e interfaces.`],
    [r`no shutdown`, r`Casi todo se deshace o se activa poniendo <code>no</code> delante. <code>?</code> da ayuda y el tabulador completa.`],
    [r`end`, r`Desde cualquier modo de configuración vuelve al privilegiado. <code>exit</code> sube un nivel y <code>disable</code> vuelve al de usuario.`],
    [r`show flash:`, r`Archivos de la flash: el IOS y, en un switch, <code>vlan.dat</code>.`],
    [r`delete flash:vlan.dat
erase startup-config
reload`, r`Switch como recién comprado. Las VLAN están en <code>vlan.dat</code>: borrar solo la configuración no las quita.`],
    [r`copy startup-config tftp:`, r`Copia la configuración a un servidor TFTP. Pide la IP y el nombre.`],
    [r`line console 0
exec-timeout 5 0`, r`Cierra la sesión tras 5 minutos sin usarla. <code>0 0</code> la deja siempre abierta.`],
  ]},
  { asig: "PAR", seccion: "Cisco básico", tema: "Bloque genérico", lista: [
    [r`enable
configure terminal
no ip domain-lookup
hostname S1
banner motd #Acceso no autorizado prohibido#
service password-encryption
enable secret class
line console 0
password cisco
login
line vty 0 15
password cisco
login
end
write`, r`Lo que va en todos los equipos: nombre, aviso legal, contraseñas cifradas y acceso por consola y remoto. En un router, <code>line vty 0 4</code> y también <code>line aux 0</code>.`],
  ]},
  { asig: "PAR", seccion: "Cisco básico", tema: "Comprobaciones", lista: [
    [r`show ip interface brief`, r`Interfaces, IP y si están levantadas. Lo primero que hay que mirar.`],
    [r`show vlan brief`, r`VLAN y qué puertos tiene cada una.`],
    [r`show interfaces trunk`, r`Enlaces troncales y su VLAN nativa.`],
    [r`show mac address-table`, r`Tabla de direcciones MAC del switch.`],
    [r`show ip route`, r`Tabla de rutas. Para IPv6: <code>show ipv6 route</code>.`],
    [r`show ip protocols`, r`Protocolos de enrutamiento activos y su distancia administrativa.`],
    [r`show ip ospf neighbor`, r`Vecinos OSPF.`],
    [r`ssh -l usuario1 192.168.99.1`, r`Desde un PC, entra por SSH en un equipo.`],
  ]},
  { asig: "PAR", seccion: "Cisco básico", tema: "Vecinos (CDP)", lista: [
    [r`show cdp neighbors`, r`Equipos Cisco conectados directamente y por qué puertos. Con <code>detail</code>, también su IP y versión.`],
    [r`no cdp run`, r`Apaga CDP en todo el equipo. En un solo puerto: <code>no cdp enable</code>. Conviene hacia fuera, porque da información.`],
  ]},
  { asig: "PAR", seccion: "Switches", tema: "VLAN y puertos", lista: [
    [r`vlan 10
name SOPORTE`, r`Crea una VLAN y le pone nombre. Si hay VTP, solo en el servidor.`],
    [r`interface vlan 99
ip address 192.168.10.161 255.255.255.240
no shutdown`, r`IP de gestión del propio switch, en la VLAN de administración. El resto de VLAN no llevan IP en el switch.`],
    [r`ip default-gateway 192.168.10.174`, r`Puerta de enlace del switch, para administrarlo desde otra red.`],
    [r`interface range f0/1-4
switchport mode access
switchport access vlan 10
no shutdown`, r`Puertos para PC o impresoras: modo acceso y su VLAN.`],
    [r`interface range g0/1-2
switchport mode trunk
switchport trunk native vlan 50
no shutdown`, r`Enlace troncal entre switches o con el router. Misma VLAN nativa en los dos extremos. En un switch capa 3, antes: <code>switchport trunk encapsulation dot1q</code>.`],
    [r`interface vlan 1
no ip address
shutdown`, r`Desactiva la VLAN 1 como VLAN de administración, si usas otra (por ejemplo, la 99).`],
    [r`interface range f0/10-15
switchport mode access
switchport access vlan 999
shutdown`, r`Puertos sin usar: en acceso, en una VLAN que no use nadie y apagados.`],
    [r`interface g0/1
speed 1000
duplex full`, r`Fija velocidad y dúplex; por defecto, <code>auto</code>. Si en un extremo fijas el dúplex, fíjalo también en el otro.`],
    [r`show interfaces f0/1 switchport`, r`Modo configurado y modo real de un puerto, y sus VLAN. Para todos: <code>show interfaces status</code>.`],
    [r`show mac address-table dynamic`, r`Solo las MAC aprendidas. <code>interface f0/1</code> en vez de <code>dynamic</code>, solo las de ese puerto.`],
    [r`no vlan 10`, r`Borra una VLAN. Antes mueve sus puertos a otra: los que queden en ella dejan de funcionar.`],
    [r`interface f0/1
no switchport access vlan`, r`Devuelve el puerto a la VLAN 1.`],
  ]},
  { asig: "PAR", seccion: "Switches", tema: "VTP", lista: [
    [r`vtp mode server
vtp domain midominio
vtp password 1234`, r`Servidor VTP: crea las VLAN y las propaga. Solo tiene sentido con más de un switch.`],
    [r`vtp mode client
vtp domain midominio
vtp password 1234`, r`Cliente VTP: recibe las VLAN, no las crea. Solo hay que asignar puertos. Dominio y contraseña, iguales que en el servidor.`],
    [r`vtp mode transparent`, r`No participa en VTP, pero deja pasar los mensajes. Las VLAN que crees son solo suyas.`],
    [r`show vtp status`, r`Modo, dominio y número de revisión.`],
    [r`vtp domain otro
vtp domain midominio`, r`Pone a cero el número de revisión. ⚠️ Hazlo antes de conectar un switch usado: si su número es mayor, sustituye las VLAN de toda la red.`],
    [r`vtp pruning`, r`En el servidor: no envía difusión por los troncales donde nadie usa esa VLAN.`],
  ]},
  { asig: "PAR", seccion: "Switches", tema: "Seguridad y SSH", lista: [
    [r`interface range f0/1-22
switchport port-security
switchport port-security maximum 1
switchport port-security mac-address sticky
switchport port-security violation shutdown`, r`Seguridad de puertos: una sola MAC por puerto, aprendida sola, y se apaga si se conecta otra. En los puertos de acceso, no en los troncales.`],
    [r`ip domain-name ejemplo.es
username usuario1 secret clave1
crypto key generate rsa
ip ssh time-out 20
ip ssh authentication-retries 3
line vty 0 15
transport input ssh
login local`, r`Activa SSH. Cuando pida el tamaño de la clave, pon 1024 o más. Con <code>secret</code> la contraseña se guarda cifrada. Hace falta haber cambiado antes el <code>hostname</code>.`],
    [r`switchport port-security mac-address 0011.2233.4455`, r`Fija a mano la MAC permitida. Con <code>sticky</code> la aprende sola.`],
    [r`switchport port-security violation restrict`, r`<code>protect</code> descarta; <code>restrict</code> descarta y avisa; <code>shutdown</code> (por defecto) apaga el puerto.`],
    [r`show port-security interface f0/1`, r`Estado de la seguridad de un puerto y última MAC vista.`],
    [r`interface f0/1
shutdown
no shutdown`, r`Recupera un puerto apagado por seguridad (<em>err-disabled</em>).`],
    [r`show ip ssh`, r`Versión y estado de SSH. Para ver las claves: <code>show crypto key mypubkey rsa</code>.`],
  ]},
  { asig: "PAR", seccion: "Switches", tema: "EtherChannel", lista: [
    [r`interface range g0/1-2
channel-group 1 mode desirable
interface port-channel 1
switchport mode trunk`, r`Agrupa varios enlaces en uno. En un extremo <code>desirable</code> (activo) y en el otro <code>auto</code> (pasivo); o <code>on</code> en los dos.`],
    [r`show etherchannel summary`, r`Estado del grupo. <code>SU</code>: funciona; <code>P</code>: el puerto está dentro.`],
    [r`channel-group 1 mode active`, r`Con LACP, el estándar: <code>active</code> y <code>passive</code>. Con PAgP, de Cisco: <code>desirable</code> y <code>auto</code>. No se mezclan, y los puertos tienen que ser iguales.`],
  ]},
  { asig: "PAR", seccion: "Switches", tema: "Enlaces troncales", lista: [
    [r`switchport trunk allowed vlan 10,20,30`, r`VLAN que pueden pasar por el troncal. Sustituye la lista: para cambiarla, <code>add 40</code> o <code>remove 20</code> detrás de <code>vlan</code>. También <code>all</code> y <code>none</code>.`],
    [r`switchport mode dynamic desirable`, r`Negocia para ser troncal. <code>dynamic auto</code> acepta si se lo piden. Mejor fijar <code>access</code> o <code>trunk</code>.`],
    [r`switchport mode trunk
switchport nonegotiate`, r`Troncal fijo y sin negociar (DTP apagado). El otro extremo tiene que ser también <code>trunk</code>.`],
  ]},
  { asig: "PAR", seccion: "Switches", tema: "Switch de capa 3", lista: [
    [r`ip routing
interface vlan 10
ip address 192.168.10.1 255.255.255.0
no shutdown
interface vlan 20
ip address 192.168.20.1 255.255.255.0
no shutdown`, r`Enruta entre VLAN sin router. La IP de cada <code>interface vlan</code> es la puerta de enlace de los equipos de esa VLAN, que tiene que existir.`],
    [r`interface g0/1
no switchport
ip address 10.0.0.1 255.255.255.252
no shutdown`, r`Puerto enrutado: el puerto deja de ser de switch y se comporta como el de un router.`],
  ]},
  { asig: "PAR", seccion: "Switches", tema: "Spanning Tree", lista: [
    [r`show spanning-tree vlan 10`, r`Quién es el switch raíz y el papel de cada puerto: <code>Root</code>, <code>Desg</code> (reenvían) o <code>Altn</code> (bloqueado).`],
    [r`spanning-tree vlan 10 root primary`, r`Hace que este switch sea el raíz de esa VLAN. En el de reserva: <code>secondary</code>.`],
    [r`spanning-tree mode rapid-pvst`, r`Versión rápida. Ponla en todos los switches.`],
    [r`interface range f0/1-20
spanning-tree portfast
spanning-tree bpduguard enable`, r`Puertos de equipos finales: conectan al momento y se apagan si alguien enchufa un switch. Nunca en los que unen switches.`],
  ]},
  { asig: "PAR", seccion: "Routers", tema: "Interfaces", lista: [
    [r`interface g0/0
description Enlace a LAN1
ip address 192.168.1.1 255.255.255.0
no shutdown`, r`IP de una interfaz. En un router vienen apagadas: sin <code>no shutdown</code> no funciona.`],
    [r`interface s0/0/0
ip address 10.0.0.1 255.255.255.252
clock rate 56000
no shutdown`, r`Enlace serie. El <code>clock rate</code> solo va en el extremo DCE. En Packet Tracer hay que añadir el módulo WIC-2T con el router apagado.`],
    [r`interface loopback0
ip address 172.16.0.1 255.255.255.255`, r`Interfaz virtual que siempre está levantada.`],
    [r`ipv6 unicast-routing
interface g0/0
ipv6 address 2001:DB8:3::1/64
ipv6 address FE80::1 link-local
no shutdown`, r`Activa IPv6 y pone la dirección. El PC puede usar como puerta de enlace la completa o <code>FE80::1</code>.`],
    [r`interface g0/0
no shutdown
interface g0/0.10
encapsulation dot1Q 10
ip address 192.168.10.1 255.255.255.0`, r`Router on a stick: una subinterfaz por VLAN. El puerto del switch tiene que ser troncal.`],
  ]},
  { asig: "PAR", seccion: "Routers", tema: "DHCP", lista: [
    [r`ip dhcp excluded-address 192.168.5.1 192.168.5.10
ip dhcp pool LAN5
network 192.168.5.0 255.255.255.0
default-router 192.168.5.1
dns-server 8.8.8.8
domain-name ejemplo.es
lease 1`, r`Servidor DHCP en el router: direcciones reservadas, red, puerta de enlace, DNS y días de concesión.`],
    [r`show ip dhcp binding`, r`Direcciones concedidas y a qué MAC.`],
    [r`debug ip dhcp server events`, r`Muestra en directo lo que hace el servidor DHCP. Se quita con <code>undebug all</code>.`],
    [r`no service dhcp`, r`Para el servicio DHCP; <code>service dhcp</code> lo arranca.`],
    [r`interface g0/0
ip helper-address 192.168.9.2`, r`El DHCP está en otra red: el router le reenvía las peticiones. Va en la interfaz de los clientes.`],
  ]},
  { asig: "PAR", seccion: "Routers", tema: "PPP", lista: [
    [r`hostname R1
username R2 password 123
interface s0/0/0
encapsulation ppp
ppp authentication pap
ppp pap sent-username R1 password 123`, r`PPP con PAP (contraseña sin cifrar). En el otro router, lo mismo con los nombres cambiados.`],
    [r`hostname R1
username R2 password 1234
interface s0/0/0
encapsulation ppp
ppp authentication chap`, r`PPP con CHAP (cifrado). El <code>username</code> es el hostname del otro router y la contraseña tiene que ser la misma en los dos.`],
  ]},
  { asig: "PAR", seccion: "Enrutamiento", tema: "Estático y por defecto", lista: [
    [r`ip route 192.168.3.0 255.255.255.0 192.168.2.2`, r`Ruta estática: red de destino, máscara y siguiente salto. Solo para redes que no son del propio router.`],
    [r`ip route 0.0.0.0 0.0.0.0 192.168.2.2`, r`Ruta por defecto: todo lo que no conozca, por ahí.`],
  ]},
  { asig: "PAR", seccion: "Enrutamiento", tema: "RIP v2", lista: [
    [r`router rip
version 2
no auto-summary
network 192.168.1.0
passive-interface g0/0`, r`RIP v2: se declaran las redes conectadas. <code>passive-interface</code> no manda actualizaciones por donde solo hay PC.`],
    [r`ip route 0.0.0.0 0.0.0.0 192.168.9.190
router rip
default-information originate`, r`Híbrido: reparte por RIP la ruta por defecto estática.`],
    [r`router rip
redistribute static`, r`Anuncia por RIP las rutas estáticas de este router.`],
  ]},
  { asig: "PAR", seccion: "Enrutamiento", tema: "OSPF", lista: [
    [r`router ospf 1
router-id 1.1.1.1
network 192.168.9.128 0.0.0.31 area 0
passive-interface g0/0`, r`OSPF: redes conectadas con la máscara <strong>inversa</strong> (wildcard). Si algo no converge: <code>clear ip ospf process</code>.`],
    [r`ipv6 unicast-routing
ipv6 router ospf 1
router-id 1.1.1.1
interface g0/0
ipv6 ospf 1 area 0`, r`OSPFv3 (IPv6): se activa en cada interfaz.`],
    [r`router ospf 1
redistribute rip subnets
router rip
redistribute ospf 1 metric 2`, r`Híbrido OSPF y RIP: cada uno anuncia lo del otro. RIP necesita una métrica.`],
    [r`show ip ospf interface`, r`Intervalos de saludo y coste. Si dos routers no se hacen vecinos, suele ser esto, el área o la máscara.`],
    [r`router ospf 1
auto-cost reference-bandwidth 1000`, r`Cambia el ancho de banda de referencia (100 Mbps por defecto). Ponlo igual en todos.`],
    [r`interface s0/0/0
bandwidth 64`, r`Velocidad real del enlace en kbps, para que OSPF calcule bien el coste.`],
  ]},
  { asig: "PAR", seccion: "Enrutamiento", tema: "BGP", lista: [
    [r`router bgp 100
neighbor 10.0.0.2 remote-as 200
network 192.168.1.0`, r`eBGP: el vecino, con el número de su sistema autónomo, y las redes propias (loopbacks y redes finales, no las de entre routers).`],
    [r`router bgp 100
redistribute ospf 1
router ospf 1
redistribute bgp 100 subnets`, r`Híbrido BGP y OSPF: cada uno anuncia lo del otro.`],
    [r`router bgp 100
redistribute static`, r`Anuncia por BGP las rutas estáticas. Comprueba con <code>show ip bgp</code>.`],
    [r`show ip bgp summary`, r`Vecinos BGP. Si en la última columna sale un número, la sesión está levantada.`],
  ]},
  { asig: "PAR", seccion: "Captura de tráfico", tema: "tcpdump", lista: [
    [r`sudo tcpdump -D`, r`Interfaces disponibles.`],
    [r`sudo tcpdump -i any -c 5 -nn`, r`Captura 5 paquetes (<code>-c</code>) en todas las interfaces, sin traducir IP ni puertos a nombres (<code>-nn</code>).`],
    [r`sudo tcpdump -i any icmp`, r`Solo un protocolo: <code>icmp</code>, <code>tcp</code>, <code>udp</code>, <code>arp</code>. Con <code>not icmp</code>, todo menos ese.`],
    [r`sudo tcpdump -i any -nn host 192.168.1.10`, r`Solo lo que va o viene de una IP. <code>src</code> origen, <code>dst</code> destino, <code>net</code> red.`],
    [r`sudo tcpdump -i any -nn "port 80 and (src 192.168.1.10 or src 192.168.1.11)"`, r`Filtros combinados, entre comillas por los paréntesis.`],
    [r`sudo tcpdump -i any -c 10 -nn -A port 80`, r`Enseña el contenido en texto (<code>-A</code>). <code>-v</code> y <code>-vv</code> dan más detalle.`],
    [r`sudo tcpdump -i any -w captura.pcap port 80`, r`Guarda la captura en un archivo, que también se abre con Wireshark.`],
    [r`tcpdump -nn -r captura.pcap src 192.168.1.10`, r`Lee una captura guardada y la filtra.`],
    [r`sudo tcpdump -i eth0 -nn "icmp or arp"`, r`Ping y ARP a la vez: se ve la pregunta por la MAC antes del primer ping.`],
  ]},
  { asig: "PAR", seccion: "Captura de tráfico", tema: "Wireshark", lista: [
    [r`dst 192.168.1.10 and (udp or icmp)`, r`Filtro de <strong>captura</strong>: decide qué se guarda. Misma sintaxis que tcpdump: <code>host</code>, <code>net</code>, <code>port</code>, <code>src</code>, <code>dst</code>, <code>and</code>, <code>or</code>, <code>not</code>.`],
    [r`udp port 53`, r`Filtro de captura para DNS. No hay filtros por protocolo de aplicación: se usa su puerto.`],
    [r`ip.addr == 192.168.1.10 && tcp.port == 443`, r`Filtro de <strong>pantalla</strong>: oculta lo ya capturado. La sintaxis es distinta a la de captura.`],
    [r`tcp.flags.syn == 1`, r`Filtro de pantalla para ver el inicio de las conexiones TCP (SYN, SYN/ACK, ACK).`],
  ]},
  { asig: "PAR", seccion: "Captura de tráfico", tema: "Comandos de red", lista: [
    [r`arp -a`, r`Tabla ARP: qué MAC corresponde a cada IP. En Windows, <code>arp -d</code> la borra.`],
    [r`tracert google.es`, r`Saltos hasta un destino (en Linux, <code>traceroute</code>). Va subiendo el TTL; cada router responde con un ICMP de tipo 11.`],
    [r`ip neigh`, r`Tabla ARP en Linux. Se vacía con <code>sudo ip neigh flush all</code>; en Windows, <code>arp -d *</code>.`],
    [r`netstat -ano`, r`Conexiones y puertos abiertos en Windows, con el PID. En Linux: <code>ss -tulpn</code>.`],
    [r`traceroute 192.168.3.10`, r`Saltos hasta un destino en Linux y en Cisco. En Windows es <code>tracert</code>.`],
    [r`ping -c 1 -t 3 192.168.3.10`, r`Un ping con TTL 3 en Linux: si hay más saltos, responde el router donde caduca. En Windows: <code>ping -n 1 -i 3</code>.`],
  ]},
  { asig: "LM", seccion: "XML y DTD", tema: "Sintaxis XML", lista: [
    [r`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<biblioteca>
  <libro isbn="123">
    <titulo>El Quijote</titulo>
  </libro>
</biblioteca>`, r`Documento XML. La declaración, si está, es la primera línea. <code>standalone="no"</code> indica que depende de un DTD externo.`],
    [r`&lt;  &gt;  &amp;  &apos;  &quot;`, r`Entidades predefinidas para <code>&lt;</code>, <code>></code>, <code>&amp;</code>, <code>'</code> y <code>"</code>. Un <code>&amp;</code> suelto rompe el documento.`],
    [r`<!-- comentario -->`, r`Comentario. No se procesa.`],
    [r`<![CDATA[ <b>texto</b> & más ]]>`, r`Texto que no se analiza: puede llevar etiquetas y símbolos sin escapar.`],
    [r`<catalogo xmlns:tec="http://ejemplo.es/tecnico" xmlns:lit="http://ejemplo.es/literario">
  <tec:autor>Ana</tec:autor>
  <lit:autor>Luis</lit:autor>
</catalogo>`, r`Espacios de nombres: evitan confundir elementos que se llaman igual.`],
    [r`xmllint --noout documento.xml`, r`Comprueba que está <strong>bien formado</strong> (Linux, paquete <code>libxml2-utils</code>). Con <code>--valid</code> lo valida con su DTD.`],
  ]},
  { asig: "LM", seccion: "XML y DTD", tema: "DTD", lista: [
    [r`<!DOCTYPE cv [
  <!ELEMENT cv (nombre, telefono, fax?, email+, idiomas)>
  <!ELEMENT nombre (#PCDATA)>
  <!ELEMENT telefono (#PCDATA)>
  <!ELEMENT fax (#PCDATA)>
  <!ELEMENT email (#PCDATA)>
  <!ELEMENT idiomas (idioma*)>
  <!ELEMENT idioma (#PCDATA)>
  <!ATTLIST idioma nivel (bajo | medio | alto) "medio">
]>`, r`DTD interno, entre la declaración y el elemento raíz. El nombre del DOCTYPE es el del elemento raíz.`],
    [r`<!DOCTYPE cv SYSTEM "cv.dtd">`, r`Enlaza un DTD externo (lo recomendado). En el <code>.dtd</code> van solo las reglas, sin DOCTYPE ni corchetes.`],
    [r`<!ELEMENT aviso (de, para?, mensaje+, nota*)>`, r`Cuántas veces: sin signo, una; <code>?</code> cero o una; <code>+</code> una o más; <code>*</code> cero o más. La coma obliga al orden.`],
    [r`<!ELEMENT aviso (de, (mensaje | nota))>`, r`La barra vertical es «uno u otro».`],
    [r`<!ELEMENT aviso (#PCDATA | nota)*>`, r`Contenido mixto: texto y elementos mezclados. <code>#PCDATA</code> va primero y siempre con <code>*</code>.`],
    [r`<!ELEMENT salto EMPTY>
<!ELEMENT libre ANY>`, r`<code>EMPTY</code>: vacío. <code>ANY</code>: cualquier contenido.`],
    [r`<!ATTLIST libro
  isbn   ID    #REQUIRED
  idioma CDATA "es"
  tipo   (novela | ensayo) #IMPLIED
  version CDATA #FIXED "1.0">`, r`Atributos: <code>CDATA</code> texto, lista de valores, <code>ID</code> identificador único. <code>#REQUIRED</code> obligatorio, <code>#IMPLIED</code> opcional, <code>#FIXED</code> fijo, o un valor por defecto. Un <code>ID</code> no puede empezar por número.`],
    [r`<!ATTLIST lengua codigo ID #REQUIRED>
<!ATTLIST idioma lengua IDREF #REQUIRED>`, r`<code>IDREF</code> tiene que coincidir con algún <code>ID</code> del documento. <code>IDREFS</code> admite varios, separados por espacios.`],
    [r`<!ENTITY empresa "Mi Empresa, S.L.">
<!ENTITY ficha SYSTEM "ficha.xml">`, r`Entidad interna y externa. Se usan con <code>&amp;empresa;</code>. Los navegadores no cargan las externas por seguridad (ataque XXE).`],
  ]},
  { asig: "LM", seccion: "XSD", tema: "Estructura", lista: [
    [r`<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="libro">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="titulo" type="xs:string"/>
        <xs:element name="anio" type="xs:integer"/>
        <xs:element name="autor" type="xs:string" minOccurs="1" maxOccurs="unbounded"/>
      </xs:sequence>
      <xs:attribute name="isbn" type="xs:string" use="required"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`, r`Esquema completo. Los atributos van después del <code>sequence</code>. Por defecto, un elemento aparece exactamente una vez.`],
    [r`<libro xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:noNamespaceSchemaLocation="libro.xsd">`, r`Enlaza el XML con su XSD, en el elemento raíz.`],
    [r`xmllint --noout --schema libro.xsd libro.xml`, r`Valida un XML con su XSD.`],
  ]},
  { asig: "LM", seccion: "XSD", tema: "Tipos y restricciones", lista: [
    [r`xs:string  xs:integer  xs:decimal  xs:boolean  xs:date  xs:time  xs:positiveInteger`, r`Tipos más usados. La fecha es <code>AAAA-MM-DD</code>.`],
    [r`<xs:simpleType name="tipoNota">
  <xs:restriction base="xs:integer">
    <xs:minInclusive value="0"/>
    <xs:maxInclusive value="10"/>
  </xs:restriction>
</xs:simpleType>`, r`Rango de valores. Se usa con <code>type="tipoNota"</code>.`],
    [r`<xs:restriction base="xs:string">
  <xs:enumeration value="bajo"/>
  <xs:enumeration value="alto"/>
</xs:restriction>`, r`Lista cerrada de valores.`],
    [r`<xs:restriction base="xs:string">
  <xs:pattern value="[0-9]{8}[A-Z]"/>
</xs:restriction>`, r`Patrón (expresión regular): aquí, un DNI. También hay <code>length</code>, <code>minLength</code> y <code>maxLength</code>.`],
    [r`<xs:complexType>
  <xs:simpleContent>
    <xs:extension base="xs:decimal">
      <xs:attribute name="moneda" type="xs:string"/>
    </xs:extension>
  </xs:simpleContent>
</xs:complexType>`, r`Elemento con texto y atributos a la vez.`],
    [r`<xs:choice>
  <xs:element name="email" type="xs:string"/>
  <xs:element name="telefono" type="xs:string"/>
</xs:choice>`, r`Uno u otro. <code>xs:sequence</code>: en orden. <code>xs:all</code>: todos, en cualquier orden.`],
  ]},
  { asig: "LM", seccion: "XPath y XQuery", tema: "XPath: rutas", lista: [
    [r`//obra`, r`Todos los elementos <code>obra</code>, estén donde estén.`],
    [r`/obras/obra/titulo`, r`Ruta desde la raíz. <code>/</code> baja un nivel y <code>//</code> busca a cualquier profundidad.`],
    [r`/obras/obra/*`, r`Todos los hijos. <code>*</code> es el comodín.`],
    [r`//obra/@pais`, r`Atributos. <code>//@*</code> los da todos.`],
    [r`//obra/titulo/text()`, r`Solo el texto. Para atributos se usa <code>string()</code>: <code>//obra/@pais/string()</code>.`],
    [r`//museo[@visible='true']/../titulo`, r`<code>..</code> sube al elemento padre.`],
  ]},
  { asig: "LM", seccion: "XPath y XQuery", tema: "XPath: condiciones", lista: [
    [r`//obra[@pais='Francia']`, r`Filtra por atributo.`],
    [r`//obra[@anyo > 1850 and @anyo < 1880]/titulo`, r`Varias condiciones: <code>and</code>, <code>or</code>, <code>not()</code>. Comparadores: <code>=</code> <code>!=</code> <code>></code> <code>&lt;</code> <code>>=</code> <code>&lt;=</code>.`],
    [r`//obra[not(@anyo = 1876)]`, r`Los que no lo cumplen.`],
    [r`//obra[1]`, r`El primero (se empieza en 1). <code>[last()]</code> el último y <code>[position() &lt;= 3]</code> los tres primeros.`],
    [r`//titulo[contains(text(), 'h')]`, r`Contiene un texto. <code>starts-with()</code> empieza por y <code>ends-with()</code> acaba en (esta desde XPath 2.0).`],
  ]},
  { asig: "LM", seccion: "XPath y XQuery", tema: "XPath: funciones y ejes", lista: [
    [r`count(//obra)`, r`Cuántos hay. También <code>sum()</code>, <code>avg()</code>, <code>max()</code> y <code>min()</code>: por ejemplo, <code>avg(//obra/@anyo)</code>.`],
    [r`//titulo/upper-case(text())`, r`Mayúsculas. <code>lower-case()</code>, <code>string-length()</code>, <code>substring(texto, 1, 3)</code>.`],
    [r`//obra[@pais='Francia']/(@anyo + 100)`, r`Operaciones: <code>+ - *</code>, <code>div</code> divide, <code>idiv</code> división entera, <code>mod</code> resto.`],
    [r`//museo[@visible='true']/parent::*`, r`Ejes: <code>parent</code>, <code>child</code>, <code>ancestor</code>, <code>descendant</code>, <code>following-sibling</code>, <code>preceding-sibling</code>.`],
    [r`//titulo/following-sibling::*`, r`Los hermanos que van después.`],
  ]},
  { asig: "LM", seccion: "XPath y XQuery", tema: "XQuery (FLWOR)", lista: [
    [r`for $a in doc("obras.xml")//obra
where $a/@anyo > 1800
order by $a/@pais descending
return $a/titulo`, r`Consulta completa: <code>for</code>, <code>let</code>, <code>where</code>, <code>order by</code>, <code>return</code>. Las variables llevan <code>$</code>.`],
    [r`for $a in doc("obras.xml")//obra
let $autor := $a/autor
return data($autor)`, r`<code>let</code> guarda un valor con <code>:=</code>. <code>data()</code> da el contenido sin etiquetas.`],
    [r`<ul>{
  for $a in doc("obras.xml")//obra
  order by $a/titulo
  return <li>{data($a/titulo)} ({data($a/@pais)})</li>
}</ul>`, r`Genera HTML: las expresiones van entre llaves.`],
    [r`for $a in doc("obras.xml")//obra
return
  if ($a/@pais = "Francia")
  then <li>{data($a/titulo)}</li>
  else ()`, r`Condición. El <code>else</code> es obligatorio; <code>()</code> es «nada».`],
    [r`sudo apt install basex`, r`Instala BaseX, la base de datos XML con la que se prueban las consultas.`],
    [r`basex -i obras.xml "//obra/titulo"`, r`Lanza una consulta desde la terminal sobre un archivo.`],
  ]},
  { asig: "LM", seccion: "XSLT y XSL-FO", tema: "Estructura", lista: [
    [r`<?xml-stylesheet type="text/xsl" href="estilo.xsl"?>`, r`Línea del documento XML que lo enlaza con su transformación. Va justo después de la declaración XML.`],
    [r`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8"/>
  <xsl:template match="/">
    <html>
      <body>
        <h1><xsl:value-of select="pelicula/titulo"/></h1>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`, r`Esqueleto de un <code>.xsl</code>. <code>match="/"</code> aplica la plantilla a todo el documento. Lo que no lleva <code>xsl:</code> sale tal cual.`],
    [r`<xsl:output method="text"/>`, r`Formato de salida: <code>html</code>, <code>xml</code> o <code>text</code>. Con <code>text</code> puedes generar JSON, CSV, SQL o código.`],
    [r`python -m http.server 8000`, r`Los navegadores bloquean la transformación si abres el XML desde el disco. Con esto lo sirves en <code>http://localhost:8000</code>. En Firefox también vale poner <code>privacy.file_unique_origin</code> a <code>false</code> en <code>about:config</code>. ⚠️ Usa Firefox: Chrome ya no transforma XSLT (comprobado en la versión 156).`],
    [r`xsltproc estilo.xsl datos.xml > salida.html`, r`Hace la transformación en la terminal, sin navegador (Linux, paquete <code>xsltproc</code>).`],
  ]},
  { asig: "LM", seccion: "XSLT y XSL-FO", tema: "Instrucciones XSLT", lista: [
    [r`<xsl:value-of select="//mes"/>`, r`Muestra el valor de un elemento o atributo (con XPath).`],
    [r`<xsl:for-each select="//gasto">
  <p><xsl:value-of select="concepto"/></p>
</xsl:for-each>`, r`Recorre un conjunto de elementos. Dentro, las rutas parten del elemento actual (<code>.</code> es él mismo).`],
    [r`<xsl:for-each select="//gasto">
  <xsl:sort select="importe" data-type="number" order="descending"/>
  <xsl:value-of select="concepto"/>
</xsl:for-each>`, r`Ordena. El <code>sort</code> va lo primero dentro del <code>for-each</code>. Sin <code>data-type="number"</code> ordena como texto (10 antes que 9).`],
    [r`<xsl:if test="@desgravable = 'si'">
  <xsl:value-of select="concepto"/>
</xsl:if>`, r`Condición simple (no tiene «si no»). Texto entre comillas simples. Menor que se escribe <code>&amp;lt;</code>.`],
    [r`<xsl:choose>
  <xsl:when test="importe > 100">Caro</xsl:when>
  <xsl:when test="importe > 50">Normal</xsl:when>
  <xsl:otherwise>Barato</xsl:otherwise>
</xsl:choose>`, r`Varias condiciones: se queda con la primera que se cumple; si ninguna, <code>otherwise</code>.`],
    [r`<a href="{web}"><xsl:value-of select="nombre"/></a>`, r`Con llaves metes un valor del XML dentro de un atributo HTML.`],
    [r`<table>
  <tr><th>Autor</th><th>Año</th></tr>
  <xsl:for-each select="//obra[anio >= 1850]">
    <xsl:sort select="anio" data-type="number"/>
    <tr>
      <td><xsl:value-of select="autor"/></td>
      <td><xsl:value-of select="anio"/></td>
    </tr>
  </xsl:for-each>
</table>`, r`Tabla HTML con los datos filtrados y ordenados: el ejercicio clásico.`],
    [r`<xsl:template match="/">
  <xsl:apply-templates select="//libro"/>
</xsl:template>
<xsl:template match="libro">
  <p><xsl:value-of select="titulo"/></p>
</xsl:template>`, r`Una plantilla por tipo de elemento, en lugar de un <code>for-each</code>.`],
  ]},
  { asig: "LM", seccion: "XSLT y XSL-FO", tema: "XSL-FO (PDF)", lista: [
    [r`<?xml version="1.0" encoding="UTF-8"?>
<fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
  <fo:layout-master-set>
    <fo:simple-page-master master-name="A4" page-height="29.7cm" page-width="21cm" margin="2cm">
      <fo:region-body margin-top="1cm" margin-bottom="1cm"/>
      <fo:region-before extent="1cm"/>
      <fo:region-after extent="1cm"/>
    </fo:simple-page-master>
  </fo:layout-master-set>
  <fo:page-sequence master-reference="A4">
    <fo:static-content flow-name="xsl-region-after">
      <fo:block text-align="center">Página <fo:page-number/></fo:block>
    </fo:static-content>
    <fo:flow flow-name="xsl-region-body">
      <fo:block font-size="16pt" text-align="center">Título</fo:block>
      <fo:block font-size="10pt" text-align="justify">Texto del párrafo.</fo:block>
    </fo:flow>
  </fo:page-sequence>
</fo:root>`, r`Documento completo: tamaño de página, pie con número y contenido. <code>region-before</code> es la cabecera y <code>region-after</code> el pie. <code>static-content</code> se repite en cada página y va antes que <code>flow</code>.`],
    [r`fop documento.fo -pdf salida.pdf`, r`Genera el PDF con Apache FOP. Otros formatos: <code>-ps</code>, <code>-rtf</code>, <code>-png</code>.`],
    [r`fop -xml datos.xml -xsl estilo.xsl -pdf salida.pdf`, r`Con los datos en un XML y el XSL-FO dentro de una hoja XSLT.`],
    [r`<fo:block font-family="monospace" linefeed-treatment="preserve" white-space="pre">código</fo:block>`, r`Bloque que respeta espacios y saltos de línea, para código.`],
  ]},
  { asig: "LM", seccion: "HTML", tema: "Estructura", lista: [
    [r`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título de la pestaña</title>
  <link rel="stylesheet" href="estilo.css">
</head>
<body>
  <h1>Hola</h1>
</body>
</html>`, r`Esqueleto de una página HTML5. El <code>viewport</code> hace que se vea bien en el móvil.`],
    [r`<meta name="description" content="De qué va la página">
<meta name="author" content="Nombre">
<meta name="robots" content="noindex">`, r`Metadatos para buscadores. <code>noindex</code> pide que no la indexen.`],
    [r`<meta http-equiv="refresh" content="3; url=https://ejemplo.es">`, r`A los tres segundos, carga otra página.`],
    [r`<!-- comentario -->`, r`Comentario: no se ve, pero sí en el código fuente.`],
    [r`&lt;  &gt;  &amp;  &quot;  &apos;  &nbsp;  &euro;  &copy;`, r`Entidades: <code>&lt;</code>, <code>></code>, <code>&amp;</code>, comillas doble y simple, espacio que no se junta, € y ©.`],
    [r`<p id="unico" class="clase1 clase2" title="Ayuda" hidden>`, r`Atributos globales: <code>id</code> (único en la página), <code>class</code> (varias, separadas por espacios), <code>title</code>, <code>hidden</code>, <code>lang</code>, <code>tabindex</code>, <code>style</code>.`],
  ]},
  { asig: "LM", seccion: "HTML", tema: "Estructura semántica", lista: [
    [r`<header>Logotipo y menú</header>
<nav>Enlaces</nav>
<main>
  <section>
    <article>Noticia</article>
  </section>
  <aside>Relacionado</aside>
</main>
<footer>Pie</footer>`, r`Partes de la página con significado. No cambian el aspecto por sí solas. <code>main</code> solo puede haber uno.`],
    [r`<h1>Título</h1>
<h2>Apartado</h2>
<p>Párrafo con <strong>importante</strong> y <em>énfasis</em>.</p>`, r`Títulos del <code>h1</code> al <code>h6</code>, en orden y sin saltarse niveles.`],
    [r`<div>bloque</div> <span>en línea</span>`, r`Contenedores sin significado. <code>div</code> ocupa todo el ancho; <code>span</code>, solo su contenido.`],
    [r`<br> <hr>`, r`Salto de línea y cambio de tema (línea). Elementos vacíos: no se cierran.`],
  ]},
  { asig: "LM", seccion: "HTML", tema: "Listas", lista: [
    [r`<ul>
  <li>Sin orden</li>
</ul>
<ol type="a" start="3">
  <li>Numerada</li>
</ol>`, r`Listas. En <code>ol</code>, <code>type</code> puede ser <code>1</code>, <code>a</code>, <code>A</code>, <code>i</code> o <code>I</code>. Se pueden anidar dentro de un <code>li</code>.`],
    [r`<dl>
  <dt>HTML</dt>
  <dd>Lenguaje de marcas de la web</dd>
</dl>`, r`Lista de definiciones: término y descripción.`],
    [r`<details>
  <summary>Ver más</summary>
  <p>Contenido plegado</p>
</details>`, r`Texto desplegable, sin JavaScript.`],
  ]},
  { asig: "LM", seccion: "HTML", tema: "Enlaces e imágenes", lista: [
    [r`<a href="pagina.html">Enlace</a>
<a href="https://ejemplo.es" target="_blank" rel="noopener">Pestaña nueva</a>
<a href="#seccion">Ir a una parte de la página</a>
<a href="mailto:correo@ejemplo.es">Correo</a>`, r`Enlaces. Los internos apuntan al <code>id</code> de otro elemento.`],
    [r`<img src="foto.jpg" alt="Descripción de la foto" width="300">`, r`Imagen. <code>alt</code> es obligatorio: es lo que leen los lectores de pantalla.`],
    [r`<figure>
  <img src="foto.jpg" alt="Descripción">
  <figcaption>Pie de foto</figcaption>
</figure>`, r`Imagen con su pie.`],
    [r`<blockquote cite="https://fuente.es">Texto citado</blockquote>`, r`Cita de otra fuente.`],
  ]},
  { asig: "LM", seccion: "HTML", tema: "Tablas", lista: [
    [r`<table>
  <caption>Notas</caption>
  <thead>
    <tr><th>Alumno</th><th>Nota</th></tr>
  </thead>
  <tbody>
    <tr><td>Ana</td><td>9</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Media</td><td>9</td></tr>
  </tfoot>
</table>`, r`Tabla con título, cabecera, cuerpo y pie. <code>tr</code> fila, <code>th</code> celda de cabecera, <code>td</code> celda.`],
    [r`<td colspan="2">Ocupa dos columnas</td>
<td rowspan="3">Ocupa tres filas</td>`, r`Unir celdas. En las filas afectadas hay que quitar las celdas que sobran.`],
  ]},
  { asig: "LM", seccion: "HTML", tema: "Formularios", lista: [
    [r`<form action="procesar.php" method="post">
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre" required>
  <button type="submit">Enviar</button>
</form>`, r`Formulario. <code>name</code> es lo que recibe el servidor; <code>for</code> enlaza la etiqueta con el <code>id</code>. <code>get</code> manda los datos en la URL y <code>post</code> no.`],
    [r`<input type="email" placeholder="correo@ejemplo.es">
<input type="password" minlength="8">
<input type="number" min="0" max="10" step="0.5">
<input type="date">
<input type="file" accept=".pdf">
<input type="tel" pattern="[0-9]{9}">`, r`Tipos de campo y sus comprobaciones. También <code>url</code>, <code>time</code>, <code>range</code>, <code>color</code>, <code>search</code>, <code>hidden</code>.`],
    [r`<label><input type="radio" name="sexo" value="m"> Mujer</label>
<label><input type="radio" name="sexo" value="h"> Hombre</label>
<label><input type="checkbox" name="acepto" checked> Acepto</label>`, r`Una sola opción: <code>radio</code> con el mismo <code>name</code>. Varias: <code>checkbox</code>.`],
    [r`<select name="curso">
  <option value="1">Primero</option>
  <option value="2" selected>Segundo</option>
</select>
<textarea name="texto" rows="4" cols="40"></textarea>`, r`Lista desplegable y texto de varias líneas.`],
    [r`<fieldset>
  <legend>Datos personales</legend>
</fieldset>`, r`Agrupa campos con un título.`],
  ]},
  { asig: "LM", seccion: "HTML", tema: "Multimedia", lista: [
    [r`<video src="video.mp4" controls width="400" poster="portada.jpg"></video>
<audio src="audio.mp3" controls></audio>`, r`Vídeo y audio. Sin <code>controls</code> no se ven los botones.`],
    [r`<iframe src="https://ejemplo.es" title="Descripción" width="600" height="400"></iframe>`, r`Incrusta otra página (un mapa, un vídeo…).`],
  ]},
  { asig: "LM", seccion: "CSS", tema: "Aplicar y prioridad", lista: [
    [r`<link rel="stylesheet" href="estilo.css">`, r`Hoja externa, en el <code>head</code>: lo recomendado.`],
    [r`<style>
  h1 { color: red; }
</style>`, r`Estilo dentro de la página.`],
    [r`<p style="color: red; margin: 0">`, r`Estilo en el propio elemento. Gana a las demás reglas (salvo <code>!important</code>).`],
    [r`color: red !important;`, r`Fuerza una declaración. Último recurso. Orden de fuerza: <code>!important</code>, estilo en línea, <code>#id</code>, <code>.clase</code> y pseudoclase, elemento, <code>*</code>. A igualdad, gana la última en leerse (da igual que esté en <code>style</code> o en una hoja externa).`],
    [r`/* comentario */`, r`Comentario.`],
    [r`color: inherit;`, r`Hereda el valor del padre. <code>initial</code> pone el valor inicial de CSS y <code>unset</code> lo quita.`],
  ]},
  { asig: "LM", seccion: "CSS", tema: "Selectores", lista: [
    [r`* { }
p { }
.clase { }
#id { }
h1, h2 { }`, r`Todos, por elemento, por clase, por id y varios a la vez.`],
    [r`div p { }
div > p { }
h1 + p { }
h1 ~ p { }`, r`Descendiente, hijo directo, hermano justo después y hermanos posteriores.`],
    [r`[type] { }
[type="text"] { }
a[href^="https"] { }
a[href$=".pdf"] { }
a[href*="ejemplo"] { }`, r`Por atributo: lo tiene, es igual, empieza por, acaba en y contiene.`],
    [r`a:hover { }
input:focus { }
input:checked { }
input:invalid { }
a:visited { }`, r`Según el estado: ratón encima, con el foco, marcado, no válido, visitado.`],
    [r`li:first-child { }
li:last-child { }
li:nth-child(3) { }
tr:nth-child(odd) { }
tr:nth-child(even) { }`, r`Por posición. <code>odd</code> son las impares y <code>even</code> las pares.`],
    [r`p:first-of-type { }
p:not(.clase) { }`, r`El primero de su tipo y los que no cumplen.`],
    [r`p::before { content: "→ "; }
p::first-letter { font-size: 3em; }
::selection { background: yellow; }`, r`Pseudoelementos, con dos pares de puntos. <code>::before</code> y <code>::after</code> necesitan <code>content</code>.`],
  ]},
  { asig: "LM", seccion: "CSS", tema: "Unidades y colores", lista: [
    [r`font-size: 1.2rem;
width: 50%;
height: 100vh;
padding: 2em;`, r`<code>rem</code>: letra de la raíz. <code>em</code>: letra del propio elemento (en <code>font-size</code>, la del padre). <code>%</code>: del contenedor. <code>vw</code> y <code>vh</code>: 1 % de la ventana. <code>px</code>: fija.`],
    [r`color: red;
color: #ff0000;
color: rgb(255, 0, 0);
color: rgba(255, 0, 0, 0.5);
color: hsl(0, 100%, 50%);`, r`Formas de escribir un color. La <code>a</code> es la transparencia: de 0 (transparente) a 1 (opaco).`],
    [r`background-image: url("fondo.jpg");
background-image: linear-gradient(to right, red, blue);`, r`Imagen o degradado de fondo. Con <code>background-size: cover</code> llena la caja.`],
  ]},
  { asig: "LM", seccion: "CSS", tema: "Texto y fuentes", lista: [
    [r`font-family: Arial, sans-serif;
font-size: 16px;
font-weight: bold;
line-height: 1.5;
text-align: center;
text-decoration: none;
text-transform: uppercase;`, r`Lo básico del texto. Acaba siempre la lista de fuentes con una genérica.`],
    [r`@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
body { font-family: "Rubik", sans-serif; }`, r`Fuente de Google. El <code>@import</code> va lo primero del archivo.`],
    [r`@font-face {
  font-family: "MiFuente";
  src: url("MiFuente.ttf");
}`, r`Fuente propia, servida desde tu web.`],
  ]},
  { asig: "LM", seccion: "CSS", tema: "Modelo de cajas", lista: [
    [r`width: 300px;
padding: 10px;
border: 2px solid black;
margin: 20px;`, r`De dentro afuera: contenido, relleno, borde y margen. Por defecto, <code>width</code> no cuenta el relleno ni el borde.`],
    [r`* { box-sizing: border-box; }`, r`Hace que el ancho incluya relleno y borde. Evita muchos líos.`],
    [r`margin: 10px 20px;
margin: 10px 20px 30px 40px;
margin: 0 auto;`, r`Dos valores: vertical y horizontal. Cuatro: arriba, derecha, abajo, izquierda. <code>0 auto</code> centra un bloque con ancho.`],
    [r`border-radius: 8px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
outline: 2px solid blue;`, r`Esquinas redondeadas, sombra y contorno (no ocupa espacio).`],
    [r`display: block;
display: inline;
display: inline-block;
display: none;`, r`En bloque (salta de línea), en línea (ignora ancho y alto), mezcla de los dos, y oculto.`],
  ]},
  { asig: "LM", seccion: "CSS", tema: "Colocar elementos", lista: [
    [r`.contenedor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}`, r`Flexbox: en fila. <code>justify-content</code> reparte en horizontal y <code>align-items</code> alinea en vertical. <code>flex-direction: column</code> lo pone en columna.`],
    [r`.contenedor {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}`, r`Rejilla de tres columnas iguales.`],
    [r`position: relative;
position: absolute;
position: fixed;
position: sticky;
top: 0;`, r`<code>absolute</code> se coloca respecto al padre con posición; <code>fixed</code>, respecto a la ventana; <code>sticky</code> se queda pegado al hacer scroll.`],
    [r`@media (max-width: 600px) {
  .contenedor { grid-template-columns: 1fr; }
}`, r`Estilos solo para pantallas pequeñas.`],
    [r`transition: background 0.3s ease;`, r`Cambio suave, por ejemplo con <code>:hover</code>.`],
  ]},
  { asig: "LM", seccion: "JavaScript", tema: "Insertar y depurar", lista: [
    [r`<script src="codigo.js" defer></script>`, r`Código en un archivo aparte: lo recomendado. <code>defer</code> lo ejecuta cuando la página ya está cargada. No escribas nada dentro de la etiqueta.`],
    [r`<script>
  console.log("Hola");
</script>`, r`Código dentro de la página. Mejor justo antes de <code>&lt;/body></code>, para que los elementos ya existan.`],
    [r`console.log(variable);`, r`Escribe en la consola (F12). <code>// comentario</code> de una línea y <code>/* comentario */</code> de varias.`],
    [r`alert("Mensaje");`, r`Ventana de aviso.`],
    [r`const seguro = confirm("¿Seguro?");`, r`Pregunta sí o no; devuelve <code>true</code> o <code>false</code>.`],
    [r`const nombre = prompt("¿Cómo te llamas?", "Anónimo");`, r`Pide un texto, con valor por defecto. Si se cancela, devuelve <code>null</code>.`],
  ]},
  { asig: "LM", seccion: "JavaScript", tema: "Variables y operadores", lista: [
    [r`const iva = 0.21;
let total = 10;
total += 5;`, r`<code>const</code> no se puede reasignar; <code>let</code> sí y solo existe en su bloque. Evita <code>var</code>: se ve fuera del bloque. Distingue mayúsculas y minúsculas.`],
    [r`typeof variable`, r`Tipo del valor: <code>number</code>, <code>string</code>, <code>boolean</code>, <code>undefined</code>, <code>object</code>… <code>undefined</code> es que no existe o no tiene valor.`],
    [r`"5" == 5    // true
"5" === 5   // false`, r`<code>==</code> convierte tipos antes de comparar; <code>===</code> compara también el tipo. Usa siempre <code>===</code> y <code>!==</code>.`],
    [r`const numero = parseInt("25", 10);
const decimal = parseFloat("3.14");
if (isNaN(numero)) console.log("No es un número");`, r`Texto a número. Con <code>+</code>, los textos se unen en vez de sumarse: <code>"5" + 1</code> es <code>"51"</code>.`],
    [r`const saludo = "Hola " + nombre;`, r`Unir textos. También con acentos graves: <code>&#96;Hola $&#123;nombre}&#96;</code>.`],
    [r`(edad >= 18 && edad <= 65) || esSocio`, r`Operadores lógicos: <code>&amp;&amp;</code> y, <code>||</code> o, <code>!</code> no.`],
  ]},
  { asig: "LM", seccion: "JavaScript", tema: "Arrays", lista: [
    [r`const semana = ["Lunes", "Martes", "Miércoles"];
console.log(semana[1]);`, r`El primer índice es el 0, así que esto muestra Martes. <code>semana.length</code> da cuántos hay.`],
    [r`semana.push("Jueves");
semana.pop();`, r`Añadir al final y quitar el último.`],
    [r`for (const dia of semana) {
  console.log(dia);
}`, r`Recorrer un array.`],
  ]},
  { asig: "LM", seccion: "JavaScript", tema: "Condiciones y bucles", lista: [
    [r`if (x >= 100) {
  console.log("Mayor o igual");
} else {
  console.log("Menor");
}`, r`Condición.`],
    [r`switch (dia) {
  case 6:
  case 7:
    console.log("Fin de semana");
    break;
  default:
    console.log("Entre semana");
}`, r`Varias opciones. Sin <code>break</code> sigue con el caso siguiente.`],
    [r`for (let i = 1; i <= 5; i++) {
  console.log(i);
}`, r`Bucle con contador. <code>break</code> lo corta y <code>continue</code> salta a la vuelta siguiente.`],
    [r`let i = 1;
while (i <= 5) {
  i++;
}`, r`Repite mientras se cumpla. <code>do { } while (condición)</code> se ejecuta al menos una vez.`],
    [r`try {
  funcionQueFalla();
} catch (err) {
  console.log(err.message);
} finally {
  console.log("Siempre se ejecuta");
}`, r`Control de errores en ejecución (no los de sintaxis).`],
  ]},
  { asig: "LM", seccion: "JavaScript", tema: "Funciones", lista: [
    [r`function sumar(a, b) {
  return a + b;
}`, r`Función con nombre. Se usa con <code>sumar(2, 3)</code>.`],
    [r`const sumar = (a, b) => a + b;`, r`Lo mismo como función flecha.`],
  ]},
  { asig: "LM", seccion: "JavaScript", tema: "DOM", lista: [
    [r`document.getElementById("num1").value`, r`Lo que el usuario ha escrito en un campo. Siempre llega como texto.`],
    [r`document.querySelector(".clase")`, r`El primer elemento que cumple un selector CSS. <code>querySelectorAll</code> los da todos.`],
    [r`document.getElementById("salida").textContent = "Hola";`, r`Cambia el texto. <code>innerHTML</code> admite etiquetas, pero no lo uses con lo que escriba el usuario.`],
    [r`elemento.style.color = "red";
elemento.classList.add("activo");`, r`Cambia el estilo o añade una clase.`],
    [r`const li = document.createElement("li");
li.textContent = "Nuevo";
document.querySelector("ul").append(li);`, r`Crea un elemento y lo añade. <code>elemento.remove()</code> lo quita.`],
  ]},
  { asig: "LM", seccion: "JavaScript", tema: "Eventos y formularios", lista: [
    [r`document.getElementById("boton").addEventListener("click", () => {
  alert("Pulsado");
});`, r`Responder a un evento: <code>click</code>, <code>input</code>, <code>change</code>, <code>submit</code>, <code>mouseover</code>, <code>keydown</code>…`],
    [r`window.addEventListener("load", iniciar);`, r`Ejecuta algo cuando la página termina de cargar (antes, <code>window.onload</code>).`],
    [r`formulario.addEventListener("submit", e => {
  const edad = parseInt(document.getElementById("edad").value, 10);
  if (isNaN(edad) || edad < 18) {
    e.preventDefault();
    alert("Debes ser mayor de edad");
  }
});`, r`Validar antes de enviar: <code>preventDefault()</code> impide el envío. El servidor tiene que validar también.`],
    [r`const mayor = Math.max(a, b);`, r`El mayor de dos números. <code>Math.min</code>, <code>Math.round</code>, <code>Math.random()</code>…`],
  ]},
  { asig: "FH", seccion: "Componentes", tema: "Ver el hardware", lista: [
    [r`sudo dmidecode -t memory`, r`Módulos de memoria: tipo, velocidad, ranura y fabricante. Cambia <code>memory</code> por <code>baseboard</code>, <code>bios</code> o <code>processor</code>.`],
    [r`free -h`, r`Memoria total, usada y libre (Linux).`],
    [r`sudo smartctl -a /dev/sda`, r`Salud del disco (paquete <code>smartmontools</code>).`],
    [r`[ -d /sys/firmware/efi ] && echo UEFI || echo BIOS`, r`Dice si Linux ha arrancado en modo UEFI o BIOS.`],
    [r`mokutil --sb-state`, r`Estado de Secure Boot en Linux.`],
    [r`Confirm-SecureBootUEFI`, r`Lo mismo en PowerShell, como administrador. Si el equipo arranca en BIOS, da error.`],
    [r`Get-PhysicalDisk | Format-Table FriendlyName, MediaType, BusType, HealthStatus`, r`Discos en Windows: tipo (HDD o SSD), conexión y salud.`],
    [r`msinfo32`, r`Información del sistema en Windows, con interfaz gráfica.`],
  ]},
  { asig: "FH", seccion: "Copias y clonación", tema: "Copias de seguridad", lista: [
    [r`tar -czvf total.tar.gz -g estado.snar /home`, r`Copia total la primera vez. El archivo <code>-g</code> apunta qué se ha copiado.`],
    [r`tar -czvf incremental1.tar.gz -g estado.snar /home`, r`Las siguientes veces con el mismo <code>-g</code>: incremental. Para hacer diferenciales, usa cada vez una copia del <code>estado.snar</code> de la total.`],
    [r`rsync -avh --delete /home/ /mnt/copia/`, r`Deja el destino igual que el origen, copiando solo lo que cambia. ⚠️ <code>--delete</code> borra del destino lo que ya no está; pruébalo antes con <code>-n</code>. La barra final del origen importa.`],
    [r`rsync -avh -e ssh /home/ usuario@IP:/copia/`, r`Copia a otro equipo por SSH.`],
    [r`0 2 * * 0 tar -czf /mnt/copia/home-$(date +\%F).tar.gz /home`, r`Línea de <code>crontab -e</code>: cada domingo a las 2:00. El orden es minuto, hora, día del mes, mes y día de la semana. En cron, el <code>%</code> se escapa.`],
    [r`sha256sum archivo.tar.gz > archivo.sha256`, r`Huella para comprobar después que la copia no se ha dañado: <code>sha256sum -c archivo.sha256</code>.`],
    [r`robocopy C:\Datos D:\Copia /MIR /R:1 /W:1 /LOG:copia.log`, r`Copia espejo en Windows. ⚠️ <code>/MIR</code> borra del destino lo que no está en el origen; con <code>/L</code> solo enseña lo que haría.`],
    [r`wbadmin start backup -backupTarget:E: -include:C: -allCritical -quiet`, r`Copia de seguridad del sistema en Windows Server.`],
  ]},
  { asig: "FH", seccion: "Copias y clonación", tema: "Clonación", lista: [
    [r`sudo dd if=/dev/sda of=/dev/sdb bs=4M status=progress conv=fsync`, r`Clona un disco en otro, de igual tamaño o mayor. ⚠️ <code>of</code> se borra entero: comprueba con <code>lsblk</code> cuál es cuál.`],
    [r`sudo dd if=/dev/sda bs=4M status=progress | gzip > disco.img.gz`, r`Guarda el disco en una imagen comprimida.`],
    [r`gunzip -c disco.img.gz | sudo dd of=/dev/sda bs=4M status=progress`, r`Restaura la imagen en un disco.`],
    [r`Dism /Capture-Image /ImageFile:D:\imagen.wim /CaptureDir:C:\ /Name:"Equipo modelo"`, r`Captura una imagen de Windows, desde un entorno de arranque (WinPE). Antes, en el equipo modelo: <code>sysprep /generalize /oobe /shutdown</code>.`],
  ]},
];
