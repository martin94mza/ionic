angular.module('donacion')

  .controller('CrearSolicitudDonacionController', function($scope, CentrosDonacionService, TiposSolicitudesService, DireccionesService, SolicitudesService, GruposSanguineosService) {
    //Obtengo los centros de donacion
    $scope.centrosDonacion = CentrosDonacionService.listadoCentros().query();

    // Obtengo las provincias de la API.
    $scope.provincias = DireccionesService.getProvincias().query();

    // Según la provincia elegida obtengo sus localidades.
    $scope.obtenerLocalidades = function(idprov) {
      $scope.localidades = DireccionesService.getLocalidades(idprov).query();
    };

    //Obtengo los tipos de solicitudes
    $scope.tiposSolicitudes = TiposSolicitudesService.query();

    //Obtengo los grupos sanguineos
    $scope.gruposSanguineos = GruposSanguineosService.listadoGruposSanguineos().query({},function(){
      $scope.check = {};
      $scope.checkClass = {};
      $scope.checkPopover = {};
      angular.forEach($scope.gruposSanguineos,function (valor, clave) {
        $scope.check[valor.id] = false;
        $scope.checkClass[valor.id] = "btn btn-danger";
        $scope.checkPopover[valor.id] = "Click para agregar grupo sanguineo";
      })
    });

    // Objeto que contendrá los datos de la solicitud

    $scope.solicitud = {
      paciente: undefined,
      gruposSanguineos:[],
      imagenes: {}
    };

    // Función para agregar o quitar grupos sanguineos dentro de los seleccionados

    $scope.addGrupoSanguineo = function (grupo) {
      var seEncontro = false;
      angular.forEach($scope.solicitud.gruposSanguineos,function(valor, clave){
        if (valor == grupo.id){
          $scope.solicitud.gruposSanguineos.splice(clave,1);
          seEncontro = true;
          $scope.check[grupo.id] = false;
          $scope.checkClass[grupo.id] = "btn btn-danger";
          $scope.checkPopover[grupo.id] = "Click para agregar grupo sanguineo";

        }
      });
      if (seEncontro == false){
        $scope.solicitud.gruposSanguineos.push(grupo.id);
        $scope.check[grupo.id] = true;
        $scope.checkClass[grupo.id] = "btn btn-fill btn-danger";
        $scope.checkPopover[grupo.id] = "Click para eliminar grupo sanguineo";
      }
    };
    $scope.solicitud.fechaPublicacion = new Date();

    // <---- Opciones DatePickers

    $scope.fechaInicioDPOptions = {
      initDate: new Date(2016, 0, 1),
      minDate: new Date(),
      datepickerMode: 'year'
    };

    $scope.fechaNacimientoDPOptions = {
      initDate: new Date(1980, 0, 1),
      minDate: new Date(1920,0,1),
      maxDate: new Date(),
      datepickerMode: 'year'
    };

    $scope.fechaDPInicio = {
      opened: false
    };

    $scope.fechaDPFin = {
      opened: false
    };

    $scope.fechaDPNacimiento = {
      opened: false
    };

    $scope.format = "dd/MM/yyyy";

    $scope.openDatePicker = function(picker) {
      if (picker == "fechaInicio")
        $scope.fechaDPInicio.opened = true;
      if (picker == "fechaFin")
        $scope.fechaDPFin.opened = true;
      if (picker == "nacimiento")
        $scope.fechaDPNacimiento.opened = true;
    };
    $scope.establecerHoraFin = function() {
      if ($scope.solicitud.fechaInicio != undefined) {
        var fechaAux = new Date($scope.solicitud.fechaInicio)
        fechaAux.setMonth(fechaAux.getMonth() + 2);
        $scope.fechaFinDPOptions = {
          initDate: $scope.solicitud.fechaInicio,
          minDate: $scope.solicitud.fechaInicio,
          maxDate: fechaAux,
          datepickerMode: 'year'
        };
        $scope.openDatePicker('fechaFin')
      }
    };

    // Opciones DatePickers ---->

    $scope.crearSolicitud = function () {
      SolicitudesService.crearSolicitudDonacion($scope.solicitud)
    }

  });
