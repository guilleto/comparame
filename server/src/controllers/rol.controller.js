import Rol from "../Models/Rol";
import { allowedRols } from "../config";
import Permission from "../Middlewares/AccessControl";
const rolMethods = {};

/**
 * Author: Juan Araque
 * Last modified: 31/03/2021
 *
 * @param {*} req
 * @param {*} res
 */
rolMethods.getRols = async (req, res) => {};

/**
 * Author: Juan Araque
 * Last modified: 31/03/2021
 *
 * @param {*} req
 * @param {*} res
 */
rolMethods.createRol = async (req, res) => {
    try {
        const permission = Permission.can(req.user.rol.name).createAny("rol")
            .granted;
        if (permission) {
            const { rol_name } = req.body;
            if (rol_name) {
                const checkRolName = allowedRols.find(
                    (rol) => rol === rol_name
                );
                if (checkRolName) {
                    const rol = new Rol({
                        rol_name,
                    });
                    if (await rol.save()) {
                        return res.status(201).json({
                            status: false,
                            message: "Rol registered successfully.",
                        });
                    } else {
                        return res.status(405).json({
                            status: false,
                            message: "There was an error, please try again.",
                        });
                    }
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "The rol name is not allowed.",
                    });
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "The rol name is required.",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "You not have permissions for access.",
            });
        }
    } catch (error) {
        return res.status(405).json({
            status: false,
            message: "There was an error, please try again.",
        });
    }
};

/**
 * Author: Juan Araque
 * Last modified: 31/03/2021
 *
 * @param {*} req
 * @param {*} res
 */
rolMethods.updateRol = async (req, res) => {};

/**
 * Author: Juan Araque
 * Last modified: 31/03/2021
 *
 * @param {*} req
 * @param {*} res
 */
rolMethods.deleteRol = async (req, res) => {};

export { rolMethods as RolController };
