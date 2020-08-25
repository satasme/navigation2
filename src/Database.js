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
            // console.log("Plugin integrity check ...");
            SQLite.echoTest()
                .then(() => {
                    // console.log("Integrity check passed ...");
                    // console.log("Opening database ...");
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size
                    )
                        .then(DB => {
                            db = DB;
                            // console.log("Database OPEN");
                            db.executeSql('SELECT 1 FROM Period LIMIT 1').then(() => {
                                //  console.log("Database is ready ... executing query ...");
                            }).catch((error) => {
                                //  console.log("Received error: ", error);
                                //  console.log("Database not yet ready ... populating data");
                                db.transaction((tx) => {
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS [Period] ([pId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [pName] NVARCHAR(50) NULL)');
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS [Hospitalbagmother] ([hId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [hName] NVARCHAR(255) NULL, [hStatus] NVARCHAR(10) NULL, [hDate] NVARCHAR(10) NULL)');
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS [Hospitalbagbaby] ([bId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [bName] NVARCHAR(255) NULL, [bStatus] NVARCHAR(10) NULL, [bDate] NVARCHAR(10) NULL)');
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS [BloodPresure] ([bpId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [bpDate] NVARCHAR(25) NULL, [bpValue] INTEGER NOT NULL, [bpmin] INTEGER NOT NULL, [bpmax] INTEGER NOT NULL)');
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS [WeightGain] ([wgId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [wgDate] NVARCHAR(25) NULL, [wgValue] INTEGER NOT NULL, [wgmin] INTEGER NOT NULL, [wgmax] INTEGER NOT NULL)');
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS [KickCount] ([kcId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [kcDate] NVARCHAR(25) NULL, [kcCount] INTEGER NOT NULL)');

                                }).then(() => {
                                    //console.log("Table created successfully");
                                }).catch(error => {
                                    // console.log(error);
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
            //  console.log("Closing DB");
            db.close()
                .then(status => {
                    //    console.log("Database CLOSED");
                })
                .catch(error => {
                    // this.errorCB(error);
                });
        } else {
            // console.log("Database was not OPENED");
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
                        // console.log("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`Prr ID: ${row.pId}, Pr Name: ${row.pName}`)
                            const { pId, pName } = row;
                            products.push({
                                pId,
                                pName,

                            });
                        }
                        // console.log(products);
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


    listBag() {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT h.hId, h.hName FROM Hospitalbagmother h', []).then(([tx, results]) => {
                        var len = results.rows.length;
                        if (len == 0) {


                        }
                        resolve(len);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    //    console.log(err);
                });
            }).catch((err) => {
                //  console.log(err);
            });
        });
    }
    listBagBaby() {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT b.bId, b.bName FROM Hospitalbagbaby b', []).then(([tx, results]) => {
                        var len = results.rows.length;
                        if (len == 0) {


                        }
                        resolve(len);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    //    console.log(err);
                });
            }).catch((err) => {
                //  console.log(err);
            });
        });
    }
    listBabyBagItems() {
        return new Promise((resolve) => {
            const baby_bag = [];

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT b.bId, b.bName, b.bStatus,b.bDate FROM Hospitalbagbaby b', []).then(([tx, results]) => {

                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                            const { bId, bName, bStatus, bDate } = row;
                            baby_bag.push({
                                bId,
                                bName,
                                bStatus,
                                bDate,

                            });
                        }
                        // console.log(mother_bag);
                        resolve(baby_bag);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    //  console.log(err);
                });

            }).catch((err) => {
                //  console.log(err);
            });
        });
    }
    listMotherBagItems() {
        return new Promise((resolve) => {
            const mother_bag = [];

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT h.hId, h.hName, h.hStatus,h.hDate FROM Hospitalbagmother h', []).then(([tx, results]) => {

                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                            const { hId, hName, hStatus, hDate } = row;
                            mother_bag.push({
                                hId,
                                hName,
                                hStatus,
                                hDate,

                            });
                        }
                        // console.log(mother_bag);
                        resolve(mother_bag);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    //  console.log(err);
                });

            }).catch((err) => {
                //  console.log(err);
            });
        });
    }
    updateStatus(data) {
        return new Promise((resolve) => {
            let status = "";
            if (data.hStatus == "true") {
                status = "false";
            } else {
                status = "true";
            }
            //  console.log(">>>>>>>>>>>>>>>>>>> date eka >>>>>>>>>>>> : "+data.date);
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE Hospitalbagmother SET hStatus = ?,hDate=?    WHERE hId = ?', [status, data.date, data.hId]).then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    //   console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    updateStatusBaby(data) {
        return new Promise((resolve) => {
            let status = "";
            if (data.bStatus == "true") {
                status = "false";
            } else {
                status = "true";
            }
            //  console.log(">>>>>>>>>>>>>>>>>>> date eka >>>>>>>>>>>> : "+data.date);
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE Hospitalbagbaby SET bStatus = ?,bDate=?    WHERE bId = ?', [status, data.date, data.bId]).then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    //   console.log(err);
                });
            }).catch((err) => {
                // console.log(err);
            });
        });
    }
    addItemOfMother_bag() {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Hospitalbagmother (hName,hStatus) VALUES ("Wearing cloths 05 with bed jacket 04","false"),'
                        + '("Shopping bag 04 (clean)","false"),("Bed sheet 01 (pillow)","false"),("Blade-01 or a bottle of anima","false"),("A pair of rubber slippers","false")').then(([tx, results]) => {
                            resolve(results);
                        });
                    tx.executeSql('INSERT INTO Hospitalbagbaby (bName,bStatus) VALUES ("Small Cloths 10-12","false"),'
                        + '("Napkin - 24","false"),("Panel cloths to wrap the baby -03 (length 36 width 36 inch)","false"),("Cotton cloths to wrap the baby -03 (length 36 width 36 inch)","false"),("Umbillical  card clip -01","false"),("Baby mosquito net","false"),("Small wash basin to wash baby 01","false"),("Rubber sheet -01","false"),("Socks, Caps, Jackets to warm baby","false")').then(([tx, results]) => {
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
    addItemOfBloodPresure() {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO BloodPresure (bpDate,bpValue,bpmin,bpmax) VALUES ("2020-08-13",79,80,120),("2020-08-14",20,80,120),("2020-08-16",40,80,120)').then(([tx, results]) => {
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
    listBloodPresure() {
        return new Promise((resolve) => {

            const blood_presure = [];

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT b.bpId, b.bpDate, b.bpValue,b.bpmin,b.bpmax FROM BloodPresure b ORDER BY b.bpId DESC LIMIT 8 ', []).then(([tx, results]) => {

                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                            const { bpId, bpDate, bpValue, bpmin, bpmax } = row;
                            blood_presure.push({

                                bpId,
                                bpDate,
                                bpValue,
                                bpmin,
                                bpmax,


                            });
                        }
                        // console.log(mother_bag);
                        resolve(blood_presure);
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

    listWeightGain() {
        return new Promise((resolve) => {

            const weight_gain = [];


            this.initDB().then((db) => {
                db.transaction((tx) => {

                    tx.executeSql('SELECT w.wgId, w.wgDate, w.wgValue,w.wgmin,w.wgmax FROM WeightGain w ORDER BY w.wgId ASC LIMIT 10 ', []).then(([tx, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                            const { wgId, wgDate, wgValue, wgmin, wgmax } = row;
                            weight_gain.push({
                                wgId,
                                wgDate,
                                wgValue,
                                wgmin,
                                wgmax,
                            });
                        }
                        // console.log(mother_bag);
                        resolve(weight_gain);
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
    lastWeightGain() {
        return new Promise((resolve) => {

            var lastweight_gain = 0;

            this.initDB().then((db) => {
                db.transaction((tx) => {

                    tx.executeSql('SELECT w.wgValue FROM WeightGain w ORDER BY w.wgId DESC LIMIT 1 ', []).then(([tx, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                            const { wgValue } = row;
                            lastweight_gain = wgValue;
                        }
                        // console.log(mother_bag);
                        resolve(lastweight_gain);
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
    addItemOfWeightGain() {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO WeightGain (wgDate,wgValue,wgmin,wgmax) VALUES ("2020-01-1",0,0,0)').then(([tx, results]) => {
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

    addPBvalue(pb) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO BloodPresure (bpDate,bpValue,bpmin,bpmax) VALUES (?,?,?,?)', [pb.bpDate, pb.bpValue, 80, 120]).then(([tx, results]) => {
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
    addWGvalue(wg) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO WeightGain (wgDate,wgValue,wgmin,wgmax) VALUES (?,?,?,?)', [wg.wgDate, wg.wgValue, 80, 120]).then(([tx, results]) => {
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
    addKickCount(kc) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO KickCount (kcDate,kcCount) VALUES (?,?)', [kc.kcDate, kc.kcValue]).then(([tx, results]) => {
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
    listKickCount(data) {
        return new Promise((resolve) => {
            var kick_count = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM KickCount k WHERE kcDate=?', [data.kcDate]).then(([tx, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { kcId, kcDate, kcCount } = row;
                            kick_count.push({
                                kcId,
                                kcDate,
                                kcCount,

                            });
                        }
                        resolve(kick_count);
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
    updateClickCount(data) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE KickCount SET kcCount = ?    WHERE kcDate = ?', [data.kcValue, data.kcDate]).then(([tx, results]) => {
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
    listAllKickCount() {
        return new Promise((resolve) => {
            var kick_count = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM KickCount k').then(([tx, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { kcId, kcDate, kcCount } = row;
                            kick_count.push({
                                kcId,
                                kcDate,
                                kcCount,

                            });
                        }
                        resolve(kick_count);
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