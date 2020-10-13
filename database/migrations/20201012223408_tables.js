exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("id");
      tbl.string("first_name", 128).notNullable();
      tbl.string("last_name", 128).notNullable();
      tbl.string("password", 128).notNullable();
      tbl.string("email", 128).notNullable().unique();
      tbl.blob("photo");
    })
    .createTable("recipes", (tbl) => {
      tbl.increments("id");
      tbl.string("name").notNullable();
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      tbl.text("directions").notNullable();
      tbl.string("prep_time").notNullable();
      tbl.string("bake_cook_time").notNullable();
      tbl.boolean("oven").defaultTo(false);
      tbl.integer("temperature");
      tbl.text("description");
      tbl.text("trade_secrets");
      tbl.text("pairings");
      tbl.blob("photo");
    })
    .createTable("tags", (tbl) => {
      tbl.increments("id");
      tbl.string("tag").notNullable().unique();
    })
    .createTable("collections", (tbl) => {
      tbl.increments("id");
      tbl.string("name").notNullable().unique();
      tbl
        .integer("admin_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      tbl.boolean("private").defaultTo(true);
      tbl.blob("photo").notNullable();
      tbl.text("description");
    })
    .createTable("comments", (tbl) => {
      tbl.increments("id");
      tbl.text("comment").notNullable();
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      tbl
        .integer("recipe_id")
        .references("id")
        .inTable("recipes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments("id");
      tbl.string("name").notNullable().unique();
    })
    .createTable("measurement_unit", (tbl) => {
      tbl.increments("id");
      tbl.string("unit").notNullable().unique();
    })
    .createTable("measurement_quantity", (tbl) => {
      tbl.increments("id");
      tbl.string("quantity").notNullable().unique();
    })
    .createTable("users_recipes", (table) => {
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      table
        .integer("recipe_id")
        .references("id")
        .inTable("recipes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      table.primary(["user_id", "recipe_id"]);
    })
    .createTable("users_collections", (table) => {
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      table
        .integer("collection_id")
        .references("id")
        .inTable("collections")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      table.primary(["user_id", "collection_id"]);
    })
    .createTable("recipes_collections", (table) => {
      table
        .integer("recipe_id")
        .references("id")
        .inTable("recipes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      table
        .integer("collection_id")
        .references("id")
        .inTable("collections")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      table.primary(["recipe_id", "collection_id"]);
    })
    .createTable("recipes_ingredients", (table) => {
      table
        .integer("recipe_id")
        .references("id")
        .inTable("recipes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      table
        .integer("ingredient_id")
        .references("id")
        .inTable("ingredients")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      table.primary(["recipe_id", "ingredient_id"]);
    })
    .createTable("recipes_tags", (table) => {
      table
        .integer("recipe_id")
        .references("id")
        .inTable("recipes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      table
        .integer("tag_id")
        .references("id")
        .inTable("tag")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .unsigned();
      table.primary(["recipe_id", "tag_id"]);
    });
};

exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("recipes_tags")
    .dropTableIfExists("recipes_ingredients")
    .dropTableIfExists("recipes_collections")
    .dropTableIfExists("users_collections")
    .dropTableIfExists("users_recipes")
    .dropTableIfExists("measurement_quantity")
    .dropTableIfExists("measurement_unit")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("comments")
    .dropTableIfExists("collections")
    .dropTableIfExists("tags")
    .dropTableIfExists("recipes")
    .dropTableIfExists("users");
};
