$(function() {
  const apiURL = 'https://652a2b0155b137ddc83f5635.mockapi.io/Vehicle';

  // Function to fetch and display vehicles from the API
    function fetchVehicles() {
      $.get(apiURL, function(data) {
          const vehicleList = $('#vehicle-list');
          vehicleList.empty();
          data.forEach(vehicle => {
              vehicleList.append(`
                  <div class="vehicle">
                      <p><strong>Model:</strong> ${vehicle.model}</p>
                      <p><strong>Type:</strong> ${vehicle.type}</p>
                      <p><strong>Color:</strong> ${vehicle.color}</p>
                      <button class="btn btn-primary update" data-id="${vehicle.id}">Update</button>
                      <button class="btn btn-danger delete" data-id="${vehicle.id}">Delete</button>
                  </div>
                `);
            });
        });
    }

  // Fetch and display vehicles on page load
  fetchVehicles();

  // Form to add a new vehicle
    $('#add-form').on('submit',function(event) {
      event.preventDefault();
      const model = $('#model').val();
      const type = $('#type').val();
      const color = $('#color').val();

        $.post(apiURL, { model, type, color }, function() {
          // Clear form inputs
          $('#model').val('');
          $('#type').val('');
          $('#color').val('');
          // Fetch and display vehicles after adding a new one
          fetchVehicles();
        });
    });

  // Update vehicle event
  $('#vehicle-list').on('click', '.update', function() {
    const id = $(this).data('id');
        $.get(`${apiURL}/${id}`, function(data) {
            $('#update-id').val(data.id);
            $('#update-model').val(data.model);
            $('#update-type').val(data.type);
            $('#update-color').val(data.color);
            $('#update-modal').modal('show'); 
        });
    });

  // Save updated vehicle
  $('#update-vehicle').on('click',function() {
    const id = $('#update-id').val();
    const model = $('#update-model').val();
    const type = $('#update-type').val();
    const color = $('#update-color').val();

        $.ajax({
            url: `${apiURL}/${id}`,
            type: 'PUT',
            data: { model, type, color },
            success: function() {
                fetchVehicles();
                $('#update-modal').modal('hide'); 
            }
        });
    });

  // Delete vehicle event
  $('#vehicle-list').on('click', '.delete', function() {
      const id = $(this).data('id');
      if (confirm('Are you sure you want to delete this vehicle?')) {
          $.ajax({
              url: `${apiURL}/${id}`,
              type: 'DELETE',
              success: function() {
                  fetchVehicles();
                }
            });
        }
    });
});
