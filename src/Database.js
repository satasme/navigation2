import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Reactoffline.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 2000;

export default class Database {

    initDB() {

        let db;
        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");
            SQLite.echoTest()
                .then(() => {
                    console.log("Integrity check passed ...");
                    console.log("Opening database ...");
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size
                    )
                        .then(DB => {
                            db = DB;
                            console.log("Database OPEN");
                            db.executeSql('SELECT 1 FROM Product LIMIT 1').then(() => {
                                console.log("Database is ready ... executing query ...");
                            }).catch((error) => {
                                console.log("Received error: ", error);
                                console.log("Database not yet ready ... populating data");
                                db.transaction((tx) => {
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS [Period] ([pId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [pName] NVARCHAR(50) NULL)');
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS [Hospitalbagmother] ([hId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [hName] NVARCHAR(50) NULL, [hStatus] NVARCHAR(50) NULL)');
                                    // tx.executeSql('CREATE TABLE IF NOT EXISTS Product (prodId, prodName, prodDesc)');

                                }).then(() => {
                                    console.log("Table created successfully");
                                }).catch(error => {
                                    console.log(error);
                                });
                            });
                            resolve(db);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log("echoTest failed - plugin not functional");
                });
        });

    };

    closeDatabase(db) {
        if (db) {
            console.log("Closing DB");
            db.close()
                .then(status => {
                    console.log("Database CLOSED");
                })
                .catch(error => {
                    // this.errorCB(error);
                });
        } else {
            console.log("Database was not OPENED");
        }
    };
    loadDB() {
        this.initDB();
    }
    // listProduct() {
    //     return new Promise((resolve) => {
    //         const products = [];

    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('SELECT p.prodId, p.prodName FROM Product p', []).then(([tx, results]) => {
    //                     console.log("Query completed");
    //                     var len = results.rows.length;
    //                     for (let i = 0; i < len; i++) {
    //                         let row = results.rows.item(i);
    //                         console.log(`Prod ID: ${row.prodId}, Prod Name: ${row.prodName}`)
    //                         const { prodId, prodName } = row;
    //                         products.push({
    //                             prodId,
    //                             prodName,

    //                         });
    //                     }
    //                     console.log(products);
    //                     resolve(products);
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    // productById(id) {
    //     console.log(id);
    //     return new Promise((resolve) => {
    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('SELECT * FROM Product WHERE prodId = ?', [id]).then(([tx, results]) => {
    //                     console.log(results);
    //                     if (results.rows.length > 0) {
    //                         let row = results.rows.item(0);
    //                         resolve(row);
    //                     }
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    // addProduct(prod) {
    //     return new Promise((resolve) => {

    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('INSERT INTO Product VALUES (?, ?, ?)', [prod.prodId, prod.prodName, prod.prodDesc]).then(([tx, results]) => {
    //                     resolve(results);
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    // updateProduct(id, prod) {
    //     return new Promise((resolve) => {
    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('UPDATE Product SET prodName = ?, prodDesc = ?,    WHERE prodId = ?', [prod.prodName, prod.prodDesc, id]).then(([tx, results]) => {
    //                     resolve(results);
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    // deleteProduct(id) {
    //     return new Promise((resolve) => {
    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('DELETE FROM Product WHERE prodId = ?', [id]).then(([tx, results]) => {
    //                     console.log(results);
    //                     resolve(results);
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    //////////////for period//////////

    adderiod(pd) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Period VALUES (?, ?)', [null, pd.pName]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    listProduct() {
        return new Promise((resolve) => {
            const products = [];

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT p.pId, p.pName FROM Period p', []).then(([tx, results]) => {
                        console.log("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            console.log(`Prr ID: ${row.pId}, Pr Name: ${row.pName}`)
                            const { pId, pName } = row;
                            products.push({
                                pId,
                                pName,

                            });
                        }
                        console.log(products);
                        resolve(products);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    abv() {
        return new Promise((resolve) => {


            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT h.hName FROM Hospitalbagmother h', []).then(([tx, results]) => {
                        console.log("@@@@@@@@@@@@@@@@@@@@@@@ Query completed");
                        var len = results.rows.length;
                        console.log("$$$$$$$$$$$$$$$$$$$$$ Query completed" + len);
                        // for (let i = 0; i < len; i++) {
                        //     let row = results.rows.item(i);
                        //     console.log(`$$$$$$$$$$$$$$$$$$$$$$$$$$ Prr ID: ${row.hId}, Pr Name: ${row.hName}`)

                        // }

                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }),
            console.log("bag full tttttttttttttttttttttttttttt  ))))))) : ");
    }
    listBag() {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT h.hId, h.hName FROM Hospitalbagmother h', []).then(([tx, results]) => {
                        var len = results.rows.length;
                        if (len == 0) {
                
                            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ athule ");
                        }
                        resolve(len);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    listMotherBagItems() {
        return new Promise((resolve) => {
            const mother_bag = [];

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT h.hId, h.hName, h.hStatus FROM Hospitalbagmother h', []).then(([tx, results]) => {
                        console.log("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                            const { hId, hName,hStatus } = row;
                            mother_bag.push({
                                hId,
                                hName,
                                hStatus,

                            });
                        }
                        console.log(mother_bag);
                        resolve(mother_bag);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    addItemOfMother_bag() {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Hospitalbagmother (hName,hStatus) VALUES ("Wearing cloths 05 with bed jacket 04","true"),'
                    +'("Shopping bag 04 (clean)","false"),("Bed sheet 01 (pillow)","true"),("Blade-01 or a bottle of anima","false"),("A pair of rubber slippers","true")').then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }


}