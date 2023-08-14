<?php

use App\Models\Room;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Room::class)->references("id")->on("rooms");
            $table->enum("type", ["open", "normal"]);
            $table->text("description")->nullable();
            $table->integer("noUsers")->default(1);
            $table->time("started_at");
            $table->time("ended_at");
            $table->date("date");
            $table->boolean("isActive")->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shift_user');
        Schema::dropIfExists('shifts');
    }
};
