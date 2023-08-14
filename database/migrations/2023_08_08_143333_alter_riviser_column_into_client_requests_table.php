<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("client_requests",function (Blueprint $table){
            $table->after("user_id",function (Blueprint $t){
                $t->nullableMorphs("revisable_by");
            });
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("client_requests",function (Blueprint $table){
            $table->dropMorphs("revisable_by");
        });
    }
};
