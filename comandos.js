// CÓMO AÑADIR UN COMANDO: copia una línea y cámbiala.
//   [r`el comando`, r`qué hace`],
// - El comando se escribe tal cual (comillas y \ incluidas). Puede ocupar varias líneas.
// - En "qué hace" puedes usar <code> y <strong>; para escribir un < suelto, pon &lt;
// - Lo único que no admite el texto es el acento grave (`) y la pareja ${
// - Un área o un tema nuevos salen solos en la web: basta con añadir otro bloque { area, tema, lista }.
const r = String.raw;

const COMANDOS = [
  // ───────────────────────────── LINUX ─────────────────────────────
  { area: "Linux", tema: "Sistema", lista: [
    [r`uname -a`, r`Muestra todos los datos del sistema (kernel, versión, nombre del host, etc). Usar <code>uname -r</code> solo para ver la versión del kernel.`],
    [r`cat /etc/os-release`, r`Muestra la versión exacta de la distribución. Vale en Debian y en Ubuntu (<code>/etc/lsb-release</code> no viene por defecto en Debian). Para ver la versión del entorno gráfico usar <code>gnome-shell --version</code>.`],
    [r`lscpu`, r`Muestra los detalles completos sobre la CPU. (Para ver solo la arquitectura, usar el comando <code>arch</code>).`],
    [r`echo $XDG_SESSION_TYPE`, r`Sirve para ver si el entorno gráfico actual está utilizando xWindow (X11) o Wayland.`],
    [r`date "+%A %d de %B de %Y"`, r`Muestra la fecha formateada (ej. "martes 24 de diciembre de 2024"). Para cambiar la fecha real del sistema se usa <code>date --set="Año-mes-dia hora:min"</code>.`],
  ]},
  { area: "Linux", tema: "Procesos", lista: [
    [r`sudo ps aux`, r`Muestra todos los procesos del sistema. Si quieres buscar uno en específico, puedes filtrarlo con tuberías: <code>sudo ps aux | grep "X"</code>.`],
  ]},
  { area: "Linux", tema: "Sesiones y apagado", lista: [
    [r`su - user`, r`Cambia al usuario <code>user</code>. El guion <code>-</code> es crítico: <strong>abre una shell de login con su entorno y variables completos</strong> (su PATH, su home...). Si solo pones <code>su</code>, mantienes las variables del usuario anterior.`],
    [r`whoami`, r`Muestra qué usuario activo está ejecutando la sesión o un script.`],
    [r`w`, r`Muestra los usuarios conectados al equipo y el tiempo de inactividad (idle) de cada sesión. Similar a usar <code>who</code>.`],
    [r`last`, r`Muestra el registro de los últimos logins (inicios de sesión) del sistema.`],
    [r`tty`, r`Muestra el nombre del archivo del terminal en sí que estás usando en ese momento (ej. <code>/dev/pts/0</code>).`],
    [r`shutdown -h now`, r`Apaga el sistema instantáneamente (Equivalente a <code>poweroff</code>).`],
  ]},
  { area: "Linux", tema: "Ficheros", lista: [
    [r`ls -la`, r`Ver archivos. <code>-a</code> muestra todos los archivos (incluso ocultos), y <code>-l</code> aporta más información (permisos, propietario, peso).`],
    [r`tree`, r`Muestra los contenidos del directorio de forma visual jerárquica (como un árbol).`],
    [r`./script.sh`, r`<strong>¿Por qué se pone el punto y barra?</strong> Al ejecutar algo, Linux busca en tu PATH (como <code>/bin</code>). Para decirle "Ejecuta ESTO que tengo justo en la carpeta en la que estoy ahora mismo", usas <code>./</code>`],
    [r`wc -l archivo.txt`, r`Cuenta el número de líneas (<code>-l</code>), palabras o caracteres de un archivo (Word Count).`],
    [r`nl archivo.txt`, r`Muestra el contenido del archivo numerando sus líneas en pantalla.`],
  ]},
  { area: "Linux", tema: "Filtros y texto", lista: [
    [r`grep -rn "upload" /etc/`, r`Busca la palabra "upload" de forma recursiva (<code>-r</code>) en todos los archivos del directorio, mostrando el número de línea (<code>-n</code>). (Muy útil en prácticas de Moodle o WordPress).`],
    [r`grep "fin$" /etc/passwd`, r`Filtro de búsqueda. El símbolo <code>$</code> significa que la línea debe <strong>terminar</strong> por la palabra "fin". (El circunflejo <code>^</code> indica que debe <strong>empezar</strong>).`],
    [r`sed -i 's/antiguo/nuevo/g' fichero.txt`, r`Reemplaza texto. La letra <code>g</code> (global) cambia TODAS las coincidencias de la línea. El <code>-i</code> (<em>in-place</em>) <strong>sobrescribe</strong> directamente el archivo original.`],
    [r`awk -F: '$2!="ES" {print $1}' fichero.txt`, r`Extrae campos. Define los dos puntos <code>-F:</code> como separador de columnas.`],
    [r`cut -d: -f1 usuarios.txt`, r`Extrae caracteres o columnas. Usa los dos puntos como delimitador (<code>-d:</code>) y extrae únicamente el primer campo (<code>-f1</code>).`],
  ]},
  { area: "Linux", tema: "Comprimir", lista: [
    [r`tar -czvf archivo.tar.gz origen/`, r`Crea (<code>c</code>) paquete tar y comprime con gzip (<code>z</code>) mostrando progreso (<code>v</code>).`],
    [r`tar -xzvf archivo.tar.gz -C destino/`, r`Extrae (<code>x</code>) y descomprime, enviando el contenido a la carpeta <code>destino/</code>.`],
  ]},
  { area: "Linux", tema: "Usuarios y permisos", lista: [
    [r`sudo adduser heidi`, r`Crea un nuevo usuario de forma interactiva. Crea su home y pide datos/contraseña.`],
    [r`sudo addgroup ventas`, r`Crea un nuevo grupo en el sistema.`],
    [r`sudo adduser heidi ventas`, r`Añade un usuario existente a un grupo existente.`],
    [r`sudo userdel -r heidi`, r`Borra al usuario y sus archivos/directorio personal por completo (<code>-r</code>).`],
    [r`sudo groupdel ventas`, r`Borra un grupo del sistema.`],
    [r`getent passwd`, r`Permite ver a los usuarios registrados en el sistema.`],
    [r`passwd user`, r`Cambio de contraseña. [Desde root, <code>passwd user</code> cambia la contraseña de user directamente].`],
  ]},
  { area: "Linux", tema: "Variables y scripts", lista: [
    [r`echo $HOME`, r`Las variables de entorno en Linux van en mayúsculas (por convención). Esta te dice cuál es tu directorio de trabajo principal asignado.`],
    [r`export PATH=$PATH:/home/heidi/mis_scripts`, r`Añade una nueva carpeta al PATH. Para que el cambio sea permanente, debe añadirse al archivo oculto <code>~/.bashrc</code> de tu usuario.`],
  ]},
  { area: "Linux", tema: "Paquetes", lista: [
    [r`sudo apt update`, r`Actualiza la lista local de repositorios (no instala nada, solo mira qué hay de nuevo).`],
    [r`sudo apt upgrade`, r`Descarga e instala las últimas versiones de los programas basados en el update anterior.`],
    [r`sudo apt install htop`, r`Descarga el programa de los repositorios y lo instala resolviendo las dependencias automáticamente.`],
    [r`sudo apt install ./archivo.deb`, r`Instala un <code>.deb</code> descargado resolviendo sus dependencias. El <code>./</code> le dice a apt que es un archivo de esta carpeta y no un paquete del repositorio.`],
    [r`sudo apt purge X`, r`Desinstala el programa X borrando también sus archivos de configuración.`],
    [r`wget https://web.com/archivo.zip`, r`Descarga archivos directamente desde internet a través de la terminal.`],
  ]},
  { area: "Linux", tema: "Discos", lista: [
    [r`sudo fdisk -l`, r`Lista detalladamente todas las particiones de todos los discos conectados al sistema.`],
    [r`fdisk`, r`Herramienta clásica en CLI para manipular tablas de particiones, pensada para <strong>MBR</strong> (las versiones actuales también manejan GPT).`],
    [r`gdisk`, r`Equivalente a fdisk pero diseñado específicamente para gestionar discos y particiones con formato <strong>GPT</strong>.`],
    [r`sudo mount /dev/sdb1 /mnt/usb`, r`Monta un dispositivo de bloques en una carpeta para poder acceder a sus archivos. Todo lo montado con este comando se pierde al reiniciar a menos que se configure en <code>/etc/fstab</code>.`],
  ]},
  { area: "Linux", tema: "Redes", lista: [
    [r`ip a`, r`Muestra la configuración de las interfaces de red (IP, máscara de subred, estado).`],
    [r`ip r`, r`Muestra la tabla de enrutamiento, permitiendo ver cuál es la <strong>Puerta de enlace (Gateway)</strong> por defecto.`],
    [r`ping -c 4 google.es`, r`Envía exactamente 4 paquetes ICMP (<code>-c 4</code>) para comprobar la conectividad exterior con Google.`],
    [r`nslookup google.es`, r`Verifica si el sistema de resolución de nombres (DNS) está funcionando correctamente resolviendo el dominio a IP. También existe en Windows.`],
    [r`sudo hostnamectl set-hostname "nombre"`, r`Cambia el nombre del equipo en caliente (en Ubuntu) sin necesidad de reiniciar.`],
    [r`sudo ip link set enp0s3 up`, r`Levanta (<code>up</code>) o baja (<code>down</code>) el estado de una tarjeta en específico. Muy común en Ubuntu.`],
    [r`sudo ifdown enp0s3`, r`Baja la tarjeta de red (en Debian). ⚠️ Si estás conectado por SSH a través de ella, te quedas fuera.`],
    [r`sudo ifup enp0s3`, r`Levanta la tarjeta de red (en Debian).`],
    [r`cat /etc/resolv.conf`, r`Permite sacar y ver los DNS configurados en el sistema (en Debian).`],
    [r`sudo netplan apply`, r`Los cambios de red se aplican automáticamente en Ubuntu al ejecutar este comando.`],
    [r`resolvectl status`, r`Permite comprobar el estado y los DNS en Ubuntu.`],
    [r`curl localhost`, r`Muestra lo que tenga el servidor alojado como HTML.`],
    [r`curl -I web.com`, r`Muestra solo la cabecera del enlace (códigos 200, 404, etc).`],
  ]},
  { area: "Linux", tema: "SSH y copia remota", lista: [
    [r`ssh-keygen`, r`Paso 1: genera una clave pública y otra privada (se guarda por defecto en <code>.ssh/</code>).`],
    [r`ssh-copy-id usu@IP`, r`Paso 2: le pasa la clave pública al archivo <code>authorized_keys</code> del servidor.`],
    [r`ssh usu@IP`, r`Paso 3: te conectas directamente. El servidor valida tu identidad matemáticamente.`],
    [r`scp archivo usu@IP:/ruta`, r`Copiar archivo(s) de mi máquina a la otra (al servidor remoto).`],
    [r`scp usu@IP:/ruta ./`, r`Copiar archivo desde el servidor remoto a mi ordenador local.`],
  ]},

  // ──────────────────────────── WINDOWS ────────────────────────────
  { area: "Windows", tema: "PowerShell básico", lista: [
    [r`$PSVersionTable`, r`Muestra información detallada sobre la versión exacta de PowerShell y el motor que estás ejecutando.`],
    [r`Get-Command Measure-*`, r`Busca todos los comandos disponibles en el sistema cuyo nombre empiece por "Measure". Ideal cuando no recuerdas el nombre exacto de un cmdlet.`],
    [r`Get-Help New-LocalUser -Examples`, r`El salvavidas. Muestra la ayuda del comando indicado y te enseña ejemplos prácticos reales de uso.`],
    [r`Get-Module`, r`Muestra los módulos cargados (conjunto de comandos que van mejor en Windows).`],
    [r`Get-Date`, r`Muestra la fecha actual.`],
    [r`Clear-Host`, r`Limpia la pantalla de la terminal.`],
    [r`Write-Host "Texto"`, r`Escribe un mensaje por pantalla. Ojo: <code>echo</code> es alias de <code>Write-Output</code>, que además lo deja pasar por la tubería; <code>Write-Host</code> solo lo pinta.`],
    [r`Stop-Computer -Force`, r`Apaga el ordenador/servidor (el Force ignora si hay otras sesiones abiertas).`],
  ]},
  { area: "Windows", tema: "Objetos y filtros", lista: [
    [r`Get-Process | Get-Member`, r`<code>Get-Member</code> se usa a través del pipe para ver todos los atributos, propiedades y métodos que tiene el objeto por debajo.`],
    [r`Select-Object NombreAtributo -First 5`, r`Elige columnas/atributos en específico. El parámetro <code>-First 5</code> muestra solo los primeros 5 resultados.`],
    [r`Get-Volume | Select-Object DriveLetter, @{Name="% Usado"; Exp={($_.Size - $_.SizeRemaining) / $_.Size * 100}}`, r`PowerShell es capaz de hacer matemáticas en vuelo dentro del pipeline. Aquí calculamos el porcentaje de disco usado basándonos en las propiedades reales.`],
    [r`Format-Table`, r`Alias <code>ft</code>. Muestra la salida en un formato de tabla limpia (Filas y Columnas).`],
    [r`Format-List`, r`Alias <code>fl</code>. Muestra la información en forma de lista (Ideal para ver <strong>todas</strong> las propiedades ocultas de un objeto).`],
    [r`Format-Wide`, r`Alias <code>fw</code>. Muestra una única propiedad repartida a lo ancho de toda la pantalla.`],
  ]},
  { area: "Windows", tema: "Ficheros", lista: [
    [r`Get-PSDrive`, r`Muestra todas las unidades accesibles. No solo verás discos (FileSystem), sino que podrás navegar por el Registro de Windows (<code>HKCU:</code>), Variables de entorno (<code>Env:</code>) o Alias (<code>Alias:</code>) como si fueran carpetas normales.`],
    [r`Get-ChildItem`, r`Ver contenido de un directorio. Alias: <code>dir</code> / <code>ls</code>.`],
    [r`Get-ChildItem -Force`, r`El parámetro <code>-Force</code> es obligatorio para ver también los archivos ocultos. Si quieres ver <strong>solo</strong> los ocultos: <code>dir ruta -Attributes Hidden</code>.`],
    [r`Get-Location`, r`Ver ruta actual. Alias: <code>pwd</code>.`],
    [r`Set-Location ruta`, r`Cambiar de directorio. Alias: <code>cd</code>.`],
    [r`New-Item nombre`, r`Crea un archivo nuevo. Alias: <code>ni nombre</code>. Es el equivalente al <code>touch</code> de Linux (que en PowerShell no existe).`],
    [r`Set-ItemProperty "ruta" -Name Attributes -Value "ReadOnly"`, r`Modifica los atributos del archivo en específico.`],
    [r`Get-ChildItem -Filter *.log | Compress-Archive -DestinationPath .\logs.zip`, r`Busca todos los .log y los pasa por la tubería para comprimirlos en un fichero ZIP. <em>(Para descomprimir se usa <code>Expand-Archive</code>)</em>. Añade el parámetro <code>-Update</code> para añadir a un zip existente sin borrar el resto.`],
  ]},
  { area: "Windows", tema: "Alias y perfil", lista: [
    [r`Get-Alias -Definition cmd`, r`Te dice a qué alias equivale ese comando.`],
    [r`Get-Alias alias`, r`Te dice a qué comando va ligado ese alias.`],
    [r`New-Alias -Name "n" -Value cmd`, r`Crea un alias <strong>temporal</strong> (se borra al cerrar).`],
    [r`Remove-Item Alias:nombre`, r`Borra un alias temporalmente de la sesión.`],
  ]},
  { area: "Windows", tema: "Software", lista: [
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
  { area: "Windows", tema: "Usuarios y permisos", lista: [
    [r`Get-LocalUser`, r`Muestra todos los usuarios locales del equipo.`],
    [r`Get-LocalGroup`, r`Muestra todos los grupos locales configurados.`],
  ]},
  { area: "Windows", tema: "Redes", lista: [
    [r`ipconfig /all`, r`Mostrar todas las configuraciones de red al detalle (IP, MAC, DNS, etc).`],
    [r`route print`, r`Mostrar las tablas de enrutamiento (ipv4 e ipv6) del equipo.`],
    [r`Get-NetAdapter`, r`Cmdlet de PowerShell para listar los adaptadores físicos o virtuales.`],
    [r`nslookup direccion`, r`Ver si los DNS funcionan correctamente / Pregunta al DNS por un dominio.`],
    [r`Get-NetFirewallRule -Name FPS-ICMP4-ERQ-In`, r`Ver si está activada la regla que <strong>permite</strong> los pings (mira el campo <code>Enabled</code>).`],
    [r`Enable-NetFirewallRule -Name FPS-ICMP4-ERQ-In`, r`Activa la regla interna del Firewall que permite responder al Ping entrante por IPv4 (Echo Request Inbound).`],
  ]},
  { area: "Windows", tema: "SSH y copia remota", lista: [
    [r`ssh administrator@192.168.0.179`, r`Inicia una terminal remota en el servidor destino por el puerto 22. Por defecto abre <strong>cmd</strong>; escribe <code>powershell</code> para pasar a PowerShell.`],
    [r`scp .\archivo.txt administrator@IP:C:/`, r`El comando <strong>Secure Copy (scp)</strong> funciona igual que en Linux. En este ejemplo, subimos el archivo local de tu PC a la raíz del disco C: del Servidor Windows.`],
  ]},

  // ───────────────────────── BASES DE DATOS ─────────────────────────
  { area: "Bases de datos", tema: "Tablas (DDL)", lista: [
    [r`CREATE TABLE EMPRESAS (
  ID_EMPRESA NUMBER(10),
  NOMBRE_EMPRESA VARCHAR2(100) NOT NULL,
  CONSTRAINT pk_empresas PRIMARY KEY (ID_EMPRESA)
);`, r`Crea una tabla con su clave primaria. Los tipos <code>NUMBER</code> y <code>VARCHAR2</code> son de Oracle; en MySQL serían <code>INT</code> y <code>VARCHAR</code>.`],
  ]},
  { area: "Bases de datos", tema: "Consultas", lista: [
    [r`SELECT [ALL | DISTINCT] col1, col2
FROM tabla1, tabla2
WHERE condicion
ORDER BY col1 [DESC | ASC];`, r`Estructura básica de una consulta. Lo que va entre corchetes es opcional: elige una opción o quítalo.`],
  ]},
  { area: "Bases de datos", tema: "INSERT", lista: [
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
  ]},
  { area: "Bases de datos", tema: "UPDATE", lista: [
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
  ]},
  { area: "Bases de datos", tema: "DELETE", lista: [
    [r`DELETE FROM emp WHERE deptno = 20;`, r`Elimina únicamente a los empleados que pertenecen al departamento 20.`],
    [r`DELETE FROM emp
WHERE deptno IN (SELECT deptno FROM dept WHERE loc = 'CHICAGO');`, r`Elimina a todos los empleados cuya localización de departamento sea Chicago.`],
    [r`DELETE FROM departamentos
WHERE NOT EXISTS (SELECT 1 FROM empleados WHERE empleados.dept_no = departamentos.dept_no);`, r`Borrar TODOS los departamentos que no tengan empleados (Borrado de "Huérfanos"). Con <code>NOT IN (SELECT dept_no FROM empleados)</code> basta un solo empleado con <code>dept_no</code> a NULL para que no borre nada.`],
  ]},
  { area: "Bases de datos", tema: "Transacciones", lista: [
    [r`START TRANSACTION; -- En MySQL explícito (o BEGIN)

-- 1. Quitar dinero a la cuenta origen
UPDATE cuentas SET saldo = saldo - 500 WHERE num_cuenta = 11111;

-- 2. Añadir dinero a la cuenta destino
UPDATE cuentas SET saldo = saldo + 500 WHERE num_cuenta = 22222;

COMMIT;`, r`El clásico ejemplo de la transferencia bancaria. Si el sistema <strong>se cae</strong> antes del COMMIT, todo se deshace solo. Pero si una orden <strong>da error</strong>, solo se deshace esa orden: tienes que lanzar tú <code>ROLLBACK;</code>, porque un <code>COMMIT</code> guardaría el primer UPDATE y se perdería el dinero. (En MySQL se requiere motor <strong>InnoDB</strong> para que funcione; en Oracle no existe START TRANSACTION, la transacción empieza sola).`],
  ]},
];
